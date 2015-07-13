import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: 'btn btn-default btn-xs status-button'.w(),
  classNameBindings: 'color isSaving'.w(),

  color: function() {
    if (this.get('error.resolved')) {
      return 'btn-success';
    } else {
      return 'btn-danger';
    }
  }.property('error.resolved'),

  click: function() {
    const model = this.get('error');
    model.toggleProperty('resolved');
    model.save();
    return false;
  },

  isSaving: function() {
    return this.get('error.isSaving');
  }.property('error.isSaving')
});
