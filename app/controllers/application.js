import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Controller.extend(ApplicationRouteMixin, {
  project:  Ember.computed.oneWay('p.model'),
  p: Ember.inject.controller('projects/project'),

  projects: function() {
    return this.store.findAll("project");
  }.property(),
});

