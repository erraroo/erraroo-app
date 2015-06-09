import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['group'],
  classNameBindings: [
    'group.isResolved:resolved:unresolved',
    'group.isJustUpdated:just-updated',
    'isCurrent',
  ],

  click: function() {
    this.set('group.isJustUpdated', false);
    return true;
  },

  isCurrent: Ember.computed('currentGroup.id', 'group.id', function() {
    return this.get('currentGroup.id') === this.get('group.id');
  }),
});
