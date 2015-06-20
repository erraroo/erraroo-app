import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [
    'projects/project/errors/error/events',
    'projects/project/errors/error/events/event',
  ],
  currentEvent: Ember.computed.oneWay('controllers.projects/project/errors/error/events/event'),
  currentEvents: Ember.computed.oneWay('controllers.projects/project/errors/error/events'),
});
