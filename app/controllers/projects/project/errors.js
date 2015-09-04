import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['status', 'page'],
  status: 'unresolved',
  page: 1,

  statusValues: [
    'all',
    'resolved',
    'unresolved',
    'muted',
  ],

  p: Ember.inject.controller('projects/project'),
  project: Ember.computed.oneWay('p.model'),

  e: Ember.inject.controller('projects/project/errors/error'),
  currentError: Ember.computed.oneWay('e.model'),

  sortProperties: ['lastSeenAt'],
  sortAscending: false,

  errorsSorting: ['lastSeenAt:desc'],
  sortedErrors: Ember.computed.sort('model', 'errorsSorting'),

  errorsUpdate: function(error) {
    const model = this.get('model');
    const project = this.get('project');
    if (Ember.isNone(model) || Ember.isNone(project)) {
      return;
    }

    if (project.id !== error.get('project.id')) {
      return;
    }

    this.flagNewError(error);
    if (model.indexOf(error) === -1) {
      model.pushObject(error);
    }
  },

  setErrors: function(groups) {
    const errors = Ember.A();
    groups.forEach(function(g) {
      errors.pushObject(g);
    });

    this.set('model', errors);
    this.set('pagination', groups.get('meta.pagination'));
  },

  flagNewErrors: function(errors) {
    errors.forEach(this.flagNewError, this);
  },

  flagNewError: function(error) {
    if (this.get('model').indexOf(error) === -1) {
      error.flag();
    }
  },

  actions: {
    nextPage() {
      this.incrementProperty('page');
    },

    prevPage() {
      this.decrementProperty('page');
  }
}
});
