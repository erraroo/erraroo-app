import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('projects', function() {
    this.route('new');
    this.route('project', {path: '/:project_id'}, function(){
      this.route('config');
      this.route('performance', { path: '/performance'}, function() {

      });

      this.route('errors', { path: '/errors'}, function() {
        this.route('error', { path: '/:error_id'}, function() {
          this.route('events', { path: '/events' }, function() {
            this.route('latest');
            this.route('event', { path: '/:event_id' }, function() {
              this.route('stack');
              this.route('plugins');
              this.route('userdata');
              this.route('logs');
            });
          });
        });
      });

      this.route('libraries');

      this.route('error', { path: '/error/:error_id'}, function() {
        this.route('events', { path: '/events' }, function() {
          this.route('event', { path: '/:offset' }, function() {
            this.route('stack');
            this.route('plugins');
            this.route('userdata');
            this.route('logs');
          });
        });
      });
    });
  });
  this.route('login');
  this.route('signup');
  this.route('forgot-password');
  this.route('recover-password', { path: '/recover-password/:token' });
  this.route('sandbox');
  this.route('settings', { path: 'settings' }, function() {
    this.route('password');
  });

  this.route('invitations');
  this.route('invitation', { path: '/invitation/:token' });
  this.route('invite');
});
