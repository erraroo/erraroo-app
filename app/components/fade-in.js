import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['fade-in'],
  addIn: function() {
    const $ = this.$();
    setTimeout(function() {
      $.addClass('in');
    }, 0);
  }.on('didInsertElement'),
});
