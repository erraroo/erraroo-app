import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Controller.extend(ApplicationRouteMixin, {
  needs:[
    'projects',
    'projects/project',
  ],

  project: Ember.computed.oneWay('controllers.projects/project.model'),
  projects: Ember.computed.oneWay('controllers.projects.model'),
});

