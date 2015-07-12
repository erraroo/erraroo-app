import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['projects/project/errors/error'],
  error: Ember.computed.oneWay('controllers.projects/project/errors/error.model'),
});
