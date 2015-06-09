import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [
    'projects/project/groups/group/errors',
    'projects/project/groups/group/errors/error',
  ],
  currentError: Ember.computed.oneWay('controllers.projects/project/groups/group/errors/error'),
  currentErrors: Ember.computed.oneWay('controllers.projects/project/groups/group/errors'),
});
