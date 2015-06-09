import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['projects/project'],
  currentProject: Ember.computed.oneWay('controllers.projects/project.model'),
});
