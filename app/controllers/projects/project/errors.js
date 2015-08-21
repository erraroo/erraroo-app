import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['status', 'library', 'page'],
  status: 'unresolved',
  library: null,
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
    if (Ember.isNone(model)) {
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

  flagNewErrors: function(groups) {
    groups.forEach(this.flagNewError, this);
  },

  flagNewError: function(group) {
    if (this.get('model').indexOf(group) === -1) {
      group.flagAsNew();
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
