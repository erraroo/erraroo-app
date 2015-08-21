import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from 'erraroo/config/environment';

const endpoint = config.apiHost + '/api/v1/sessions';
const restoreEndpoint = config.apiHost + '/api/v1/users/me';

export default Base.extend({
  authenticate: function(data) {
    const that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.ajax(endpoint, 'POST', data).then(function(response) {
        Ember.run(this, resolve, response);

        const userID = `${response.userID}`;
        const cu = that.container.lookup('service:current-user');
        Ember.run(cu, 'authenticated', userID);
      }, function(xhr /*, status, error*/) {
        reject(xhr.responseJSON || xhr.responseText);
      });
    });
  },

  invalidate: function() {
    return this.ajax(endpoint, 'DELETE');
  },

  restore: function(data) {
    const that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (data && Ember.isEmpty(data.token)) {
        reject();
      }

      that.ajax(restoreEndpoint, 'get', null, data.token).then(function(payload) {
        const userID = `${payload.User.ID}`;
        const store = that.container.lookup('service:store');
        Ember.run(store, 'pushPayload', payload);

        data.userID = userID;
        resolve(data);
        Ember.run(this, resolve, data);

        const cu = that.container.lookup('service:current-user');
        Ember.run(cu, 'authenticated', userID);
      }, function() {
        reject();
      });
    });
  },

  ajax: function(url, method, data, token) {
    const hash =  {
      crossDomain: true,
      type: method,
      url: url,
    };

    if (data) {
      hash.dataType = 'json';
      hash.data = JSON.stringify(data);
    }


    if (token) {
      hash.headers = {
        'Authorization': token,
      };
    }

    return Ember.$.ajax(hash);
  },
});
