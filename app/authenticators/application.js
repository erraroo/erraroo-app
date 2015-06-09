import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import config from 'erraroo/config/environment';

const endpoint = config.apiHost + '/api/v1/sessions';

export default Base.extend({
  authenticate: function(data) {
    const that = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      that.ajax(endpoint, 'POST', data).then(function(response) {
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
    console.log('restore', data);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (data && !Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  ajax: function(url, method, data) {
    const hash =  {
      crossDomain: true,
      type: method,
      url: url,
    };

    if (data) {
      hash.dataType = 'json';
      hash.data = JSON.stringify(data);
    }

    return Ember.$.ajax(hash);
  },
});
