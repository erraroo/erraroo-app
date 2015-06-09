import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'erraroo/tests/helpers/start-app';
import Pretender from 'pretender';

var application, server;

module('Acceptance: Auth', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    if (server) {
      server.shutdown();
      server = null;
    }
  }
});

test('visiting / should redirect to login page', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

// this behavior used to work in the test suite...
//test('should login if manifest.user is available', function(assert) {
  //assert.expect(1);

  //window.manifest = {};
  //window.manifest.UserID = 1;
  //window.manifest.Users = [{ID: 1, Email: 'bob@example.com'}];

  //Ember.run(application, 'destroy');
  //application = startApp();
  //assert.ok(controllerFor('session').get('isAuthenticated'));
//});

