import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['status', 'tags', 'library'],
  status: 'unresolved',
  tags: [],
  library: null,

  statusValues: [
    'all',
    'resolved',
    'unresolved',
    'muted',
  ],

  needs: [
    'projects/project/errors/error',
    'projects/project'
  ],

  project: Ember.computed.oneWay('controllers.projects/project.model'),

  sortProperties: ['lastSeenAt'],
  sortAscending: false,

  errorsSorting: ['lastSeenAt:desc'],
  sortedErrors: Ember.computed.sort('model', 'errorsSorting'),

  errorsUpdate: function(error) {
    this.flagNewError(error);
    if (this.get('model').indexOf(error) === -1) {
      this.get('model').pushObject(error);
    }
  },

  setErrors: function(groups) {
    const errors = Ember.A();
    groups.forEach(function(g) {
      errors.pushObject(g);
    });

    this.set('model', errors);
  },

  flagNewErrors: function(groups) {
    groups.forEach(this.flagNewError, this);
  },

  flagNewError: function(group) {
    if (this.get('model').indexOf(group) === -1) {
      group.flagAsNew();
    }
  },

  currentError: Ember.computed.oneWay('controllers.projects/project/errors/error.model'),
});
