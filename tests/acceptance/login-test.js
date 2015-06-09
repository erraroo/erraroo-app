import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'erraroo/tests/helpers/start-app';
import Pretender from 'pretender';

var application, server;

module('Acceptance: Login', {
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

test('visiting /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('displays a message with a bad login', function(assert) {
  server = new Pretender(function() {
    this.post('/api/v1/sessions', function() {
      const errors = JSON.stringify({
        Errors: {
          Signin: ['invalid email or password'],
        }
      });
      return [400, {"Content-Type": "application/json"}, errors];
    });
  });

  visit('/login');
  click("button:contains('Login')");
  andThen(function() {
    assert.equal(currentPath(), 'login');
    assert.equal(find('.message').text().trim(), 'invalid email or password');
  });
});

test('signs the user in', function(assert) {
  assert.expect(3);

  server = new Pretender(function() {
    this.get('/api/v1/projects', function(request) {
      const project = JSON.stringify({Projects: []});
      return [200, {"Content-Type": "application/json"}, project];
    });

    this.post('/api/v1/sessions', function(request) {
      const params = JSON.parse(request.requestBody);
      assert.equal('bob@example.com', params.Signin.Email);
      assert.equal('password', params.Signin.Password);

      const user = JSON.stringify({
        User: {
          ID: 1,
          Email: 'bob@example.com'
        }
      });
      return [201, {"Content-Type": "application/json"}, user];
    });
  });

  visit('/login');
  fillIn('#email', 'bob@example.com');
  fillIn('#password', 'password');
  click("button:contains('Login')");
  andThen(function() {
    assert.equal(currentPath(), 'projects.new', 'should be shown the create new project page because they have no projects');
  });
});

test('redirects to the page we tried to view after we login', function(assert) {
  server = new Pretender(function() {
    this.post('/api/v1/sessions', function(request) {
      const user = JSON.stringify({
        User: {
          ID: 1,
          Email: 'bob@example.com'
        }
      });
      return [201, {"Content-Type": "application/json"}, user];
    });
  });

  visit('/sandbox');
  fillIn('#email', 'bob@example.com');
  fillIn('#password', 'password');
  click('button:contains("Login")');
  andThen(function() {
    assert.equal(currentPath(), 'sandbox');
  });
});
