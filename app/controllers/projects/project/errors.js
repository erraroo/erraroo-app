import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['status'],
  status: 'unresolved',

  statusValues: [
    'all',
    'resolved',
    'unresolved',
    'muted',
  ],

  needs: [
    'projects/project/errors/error'
  ],

  sortProperties: ['lastSeenAt'],
  sortAscending: false,

  errorsUpdate: function(error) {
    this.flagNewError(error);
    if (this.indexOf(error) === -1) {
      this.pushObject(error);
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
    if (this.indexOf(group) === -1) {
      group.flagAsNew();
    }
  },

  currentError: Ember.computed.oneWay('controllers.projects/project/errors/error.model'),
});
