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

  projectMenuPath: Ember.computed('currentPath', function() {
    const defaultPath = 'projects.project.errors.index';
    const currentPath = this.get('currentPath');

    if (currentPath.indexOf('projects.project.') === -1) {
      return defaultPath;
    }

    if (currentPath.indexOf('.event.') > -1) {
      return defaultPath;
    }

    return currentPath;
  })
});

