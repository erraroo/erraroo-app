import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  puller: Ember.inject.service('puller'),

  activate() {
    this._super();
    this.get('puller').start();
  },
});
