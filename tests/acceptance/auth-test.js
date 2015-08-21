import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'erraroo/tests/helpers/start-app';
import {defaultRoutes} from 'erraroo/tests/server/routes';
import Pretender from 'pretender';

let application, server;

module('Acceptance: Auth', {
  beforeEach: function() {
    server = new Pretender(defaultRoutes);
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
  invalidateSession();

  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});
