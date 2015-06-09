import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  //beforeModel: function(transition) {
    //this._super(transition);

    //if (!this.controllerFor('session').get('isAuthenticated')) {
      //this.redirectToLogin(transition);
    //}
  //},

  //redirectToLogin: function(transition) {
    //this.controllerFor('login').set('atemptedTransition', transition);
    //this.transitionTo('login');
  //}
});
