import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',

  classNames: ['btn', 'btn-xs', 'btn-default'],
  classNameBindings: ['error.muted:btn-info:btn-default'],

  click() {
    const error = this.get('error');
    error.toggleProperty('muted');
    error.save();
    return false;
  }
});
