/* global moment */
import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['log'],
  classNameBindings: ['level'],

  formatedTimestamp: computed('timestamp', function() {
    return moment(this.get('timestamp')).format("YYYY MM hh:mm:ss");
  }),

  componentName: computed('payload.event', function() {
    const event = this.get('payload.event');
    switch(event) {
      case 'error':
        return 'log-entry/error-entry';
      case 'didTransition':
        return 'log-entry/did-transition';
      case 'willTransition':
        return 'log-entry/will-transition';
      default:
        return 'log-entry/json-entry';
    }
  })
});
