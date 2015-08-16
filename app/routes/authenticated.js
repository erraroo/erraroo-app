import Ember from 'ember';
//import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

//export default Ember.Route.extend(AuthenticatedRouteMixin, {
export default Ember.Route.extend({
  puller: Ember.inject.service('puller'),

  activate() {
    this._super();
    this.get('puller').start();
  },
});
