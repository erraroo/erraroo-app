import Ember from 'ember';
/* global hljs */

// TODO: If there is bound content in the source block
// changing that content does not actualy update.
export default Ember.Component.extend({
  tagName: 'pre',
  classNames: ['highlight-code'],
  highlight: function() {
    hljs.highlightBlock(this.element);
  }.on('didInsertElement'),
});
