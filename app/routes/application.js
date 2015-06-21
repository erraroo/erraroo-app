import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    signin: function(user) {
      this.controllerFor('session').signin(user);
    },

    signout: function() {
      this.controllerFor('session').signout();
      this.transitionTo('login');
    },

    triggerNewError: function() {
      throw new Error('i threw an error' + Math.random());
    },
  },
});
