import Ember from 'ember';

export default Ember.Controller.extend({
  evts: Ember.inject.controller('projects/project/errors/error/events'),
  event: Ember.inject.controller('projects/project/errors/error/events/event'),
  currentEvent: Ember.computed.oneWay('event.model'),
  currentEvents: Ember.computed.oneWay('evts.model'),
});
