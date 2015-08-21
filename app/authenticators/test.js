import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore: function(data) {
    console.log('restore', data);
    if (data) {
      return Ember.RSVP.resolve(data);
    } else {
      return Ember.RSVP.reject();
    }
  },

  authenticate: function(options) {
    const that = this;
    return new Ember.RSVP.Promise(function(resolve){
      const cu = that.container.lookup('service:current-user');
      Ember.run(cu, 'authenticated', options.userID);
      resolve(options);
    });
  },

  invalidate: function() {
    return Ember.RSVP.resolve();
  }
});
