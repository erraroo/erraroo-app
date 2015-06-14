import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Controller.extend(ApplicationRouteMixin, {
  needs:[
    'projects',
    'projects/project',
  ],
  projects: Ember.computed.oneWay('controllers.projects.model'),
  project:  Ember.computed.oneWay('controllers.projects/project.model'),
});

