import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  puller: Ember.inject.service('puller'),
  currentUser: Ember.inject.service('current-user'),

  activate() {
    this._super();
    this.get('puller').start();
  },
});
