import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'erraroo/tests/helpers/start-app';
import Pretender from 'pretender';

var application, server;

module('Acceptance: Signup', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    server.shutdown();
    Ember.run(application, 'destroy');
  }
});

test('empty sign up displays errors', function(assert) {
  server = new Pretender(function() {
    this.post('/api/v1/signups', function() {
      const errors = JSON.stringify({
        'Errors': {
          'Email': ['error-1', 'error-2'],
          'Password': ['error-3'],
        }
      });
      return [400, {"Content-Type": "application/json"}, errors];
    });
  });
  visit('/signup');
  click("button:contains('Sign up')");

  andThen(function() {
    assert.equal(currentURL(), '/signup');
    assert.equal(find('.has-error').length, 2);
    assert.equal(find('.has-error .help-block').text(), 'error-1error-2error-3');
  });
});

test('signs up and logs the new user in', function(assert) {
  assert.expect(3);
  server = new Pretender(function() {
    this.post('/api/v1/signups', function(request) {
      const params = JSON.parse(request.requestBody);
      assert.equal('bob@example.com', params.Signup.Email);
      assert.equal('password', params.Signup.Password);

      const user = {User: {ID: '1', Email: 'bob@example.com'}};
      return [201, {"Content-Type": "application/json"}, JSON.stringify(user)];
    });
  });

  visit('/signup');
  fillIn('#email', 'bob@example.com');
  fillIn('#password', 'password');
  click("button:contains('Sign up')");

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
