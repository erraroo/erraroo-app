import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['projects/project/groups/group'],
  group: Ember.computed.oneWay('controllers.projects/project/groups/group.model'),
});
