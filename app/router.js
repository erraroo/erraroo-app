import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('projects', function() {
    this.route('new');
    this.route('project', {path: '/:project_id'}, function(){
      this.route('config');
      this.route('performance', { path: '/performance'}, function() {

      });

      this.route('groups', { path: '/groups'}, function() {
        this.route('group', { path: '/:group_id'}, function() {
          this.route('errors', { path: '/errors' }, function() {
            this.route('latest');
            this.route('error', { path: '/:error_id' }, function() {
              this.route('stack');
              this.route('state');
              this.route('ember');
            });
          });
        });
      });
    });
  });
  this.route('login');
  this.route('signup');
  this.route('sandbox');
  this.route('settings');
});
