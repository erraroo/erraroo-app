import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['error'],
  classNameBindings: [
    'error.isJustUpdated:just-updated',
    'isCurrent',
  ],

  click: function() {
    this.set('error.isJustUpdated', false);
    return true;
  },

  isCurrent: Ember.computed('currentError.id', 'error.id', function() {
    return this.get('currentError.id') === this.get('error.id');
  }),
});
