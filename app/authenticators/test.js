import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from 'erraroo/config/environment';

export default Base.extend({
  restore: function(data) {
    return Ember.RSVP.reject();
  },

  authenticate: function(options) {
    const that = this;
    return new Ember.RSVP.Promise(function(resolve, reject){
      const cu = that.container.lookup('service:current-user');
      cu.authenticated(options.userID);
      resolve(options);
    });
  },

  invalidate: function(data) {
    return Ember.RSVP.resolve();
  }
});
