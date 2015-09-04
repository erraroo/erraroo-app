import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'erraroo/tests/helpers/start-app';
import {defaultRoutes} from 'erraroo/tests/server/routes';
import Pretender from 'pretender';

var application, server;

const page = {
  url: '/signup',
  visit() {
    visit(this.url);
  },

  fillIn(email='bob@example.com', password='password') {
    fillIn('#email', email);
    fillIn('#password', password);
  },

  submit() {
   click("button:contains('Create My New Account')");
  }
};

module('Acceptance: Signup', {
  beforeEach: function() {
    server = new Pretender(defaultRoutes);
    application = startApp();
  },

  afterEach: function() {
    server.shutdown();
    Ember.run(application, 'destroy');
    if (server) {
      server.shutdown();
      server = null;
    }
  }
});

test('empty sign up displays errors', function(assert) {
  server.post('/api/v1/signups', function() {
    const errors = JSON.stringify({
      'Errors': {
        'Email': ['error-1', 'error-2'],
        'Password': ['error-3'],
      }
    });
    return [400, {"Content-Type": "application/json"}, errors];
  });

  page.visit();
  page.submit();

  andThen(function() {
    assert.equal(currentURL(), '/signup');
    assert.equal(find('.has-error').length, 2);
    assert.equal(find('.has-error .help-block').text(), 'error-1error-2error-3');
  });
});

test('signs up and logs the new user in', function(assert) {
  assert.expect(3);

  server.post('/api/v1/signups', function(request) {
    const params = JSON.parse(request.requestBody);
    assert.equal('bob@example.com', params.Signup.Email);
    assert.equal('password', params.Signup.Password);

    const user = {User: {ID: '1', Email: 'bob@example.com'}};
    return [201, {"Content-Type": "application/json"}, JSON.stringify(user)];
  });

  page.visit();
  page.fillIn();
  page.submit();

  andThen(function() {
    assert.equal(currentURL(), '/projects/1/errors', 'redirects to their first project');
  });
});
