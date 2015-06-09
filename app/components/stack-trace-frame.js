import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['frame'],
  classNameBindings: ['isExpanded'],
  isExpanded: false,
});
