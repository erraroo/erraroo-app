import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['error'],
  classNameBindings: ['error.seen:seen:unseen'],
});
