import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),

  project:  Ember.computed.oneWay('p.model'),
  p: Ember.inject.controller('projects/project'),

  projects: Ember.computed.sort('_projects', 'projectsSorting'),
  projectsSorting: ['name:asc'],
  _projects: function() {
    return this.store.findAll("project");
  }.property(),
});

