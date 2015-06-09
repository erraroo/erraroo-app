import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: 'btn btn-default btn-xs status-button'.w(),
  classNameBindings: 'color isSaving'.w(),

  color: function() {
    if (this.get('group.resolved')) {
      return 'btn-success';
    } else {
      return 'btn-danger';
    }
  }.property('group.resolved'),

  click: function() {
    const model = this.get('group');
    model.toggleProperty('resolved');
    model.save();
  },

  isSaving: function() {
    return this.get('group.isSaving');
  }.property('group.isSaving')
});
