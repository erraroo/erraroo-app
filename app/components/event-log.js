import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  logsSorting: ['timestamp:desc'],
  sortedLogs: computed.sort('logs', 'logsSorting'),

  logs: computed('event', function() {
    const event = this.get('event');
    return event.get('json.logs');
  })
});
