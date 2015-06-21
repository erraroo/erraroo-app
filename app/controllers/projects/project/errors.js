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

  setErrors: function(groups) {
    this.flagNewErrors(groups);
    this.set('model', groups);
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
