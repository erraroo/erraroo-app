/* global moment */
import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['log'],
  classNameBindings: ['level'],

  formatedTimestamp: computed('timestamp', function() {
    return moment(this.get('timestamp')).format("YYYY MM hh:mm:ss");
  })
});
