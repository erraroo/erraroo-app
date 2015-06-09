import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: [
    'projects/project/groups/group'
  ],

  sortProperties: ['cratedAt', 'lastSeenAt'],
  sortAscending: false,

  setGroups: function(groups) {
    this.flagNewGroups(groups);
    this.set('model', groups);
  },

  flagNewGroups: function(groups) {
    groups.forEach(this.flagNewGroup, this);
  },

  flagNewGroup: function(group) {
    if (this.indexOf(group) === -1) {
      group.flagAsNew();
    }
  },

  currentGroup: Ember.computed.oneWay('controllers.projects/project/groups/group.model'),
});
