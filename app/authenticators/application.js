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
        const cu = that.container.lookup('service:current-user');
        cu.authenticated(`${response.userID}`);

        resolve(response);
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
        const store = that.container.lookup('service:store');
        Ember.run(store, 'pushPayload', payload);

        const cu = that.container.lookup('service:current-user');
        cu.authenticated(`${payload.User.ID}`);

        data.userID = payload.User.ID;
        resolve(data);
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
