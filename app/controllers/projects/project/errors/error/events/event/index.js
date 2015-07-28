import Ember from 'ember';

export default Ember.Controller.extend({
  e: Ember.inject.controller('projects/project/errors/error'),
  error: Ember.computed.oneWay('e.model'),
});
