import Ember from 'ember';

export default Ember.Controller.extend({
  events: Ember.inject.controller('projects/project/errors/error/events'),
  event: Ember.inject.controller('projects/project/errors/error/events/event'),
  currentEvent: Ember.computed.oneWay('event.model'),
  currentEvents: Ember.computed.oneWay('events.model'),
});
