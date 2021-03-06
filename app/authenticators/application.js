import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from 'erraroo/config/environment';

const endpoint = config.apiHost + '/api/v1/sessions';
const restoreEndpoint = config.apiHost + '/api/v1/users/me';

export default Base.extend({
  cu: Ember.inject.service('current-user'),

  authenticate(data) {
    const service = this.get('cu');
    const that = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.ajax(endpoint, 'POST', data).then(function(response) {
        const userID = `${response.userID}`;
        const token  = `${response.token}`;

        Ember.run(this, resolve, response);
        Ember.run(service, 'authenticated', userID, token);
      }, function(xhr /*, status, error*/) {
        reject(xhr.responseJSON || xhr.responseText);
      });
    });
  },

  invalidate() {
    return this.ajax(endpoint, 'DELETE');
  },

  restore(data) {
    const cu = this.get('cu');
    const that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (data && Ember.isEmpty(data.token)) {
        reject();
      }

      that.ajax(restoreEndpoint, 'get', null, data.token).then(function(payload) {
        const userID = `${payload.User.ID}`;
        const store = that.container.lookup('service:store');
        Ember.run(store, 'pushPayload', payload);
        Ember.run(this, resolve, data);
        Ember.run(cu, 'authenticated', userID, data.token);
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
