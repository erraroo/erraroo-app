import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'erraroo/tests/helpers/start-app';
import {defaultRoutes}from 'erraroo/tests/server/routes';
import Pretender from 'pretender';

let application, server = null;

module('Acceptance: Projects', {
  beforeEach: function() {
    server = new Pretender(defaultRoutes);
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('visiting /projects', function(assert) {
  assert.expect(4);

  authenticateSession({userID: '1'});
  visit('/projects');

  andThen(function() {
    assert.equal(currentURL(), '/projects/1/errors');
    assert.equal(find('.error').length, 2);
    assert.equal(find('.error:eq(0) .error-message').text().trim(), 'error one');
    assert.equal(find('.error:eq(1) .error-message').text().trim(), 'error two');
  });
});

test('creating a project', function(assert) {
  assert.expect(3);

   server.post('/api/v1/projects', function(request) {
    const params = JSON.parse(request.requestBody);
    assert.equal('test project', params.Project.Name, 'it sends the correct project name');

    return [201, {"Content-Type": "application/json"},
      JSON.stringify({
        Project: {
          ID: 1,
          Name: params.Project.Name,
          Token: 'PROJECT-TOKEN-1'
        }
      })];
  });

  authenticateSession({userID: '1'});
  visit('/projects/new');
  fillIn('#name', 'test project');
  click("button:contains('Create Project')");

  andThen(function() {
    assert.equal(currentURL(), '/projects/1/install', 'redirects to the projects install page');

    const js = find('.hljs.javascript').text().trim();
    assert.ok(js.indexOf('PROJECT-TOKEN-1') > -1, 'displays the project token');
  });
});

test('can not create project without a name', function(assert) {
  assert.expect(3);

  server.post('/api/v1/projects', function(request) {
    const params = JSON.parse(request.requestBody);
    assert.equal('test project', params.Project.Name);

    const project = JSON.stringify({Errors: {Name: ['name errors']}});
    return [400, {"Content-Type": "application/json"}, project];
  });

  authenticateSession({userID: '1'});

  visit('/projects/new');
  fillIn('#name', 'test project');
  click("button:contains('Create Project')");

  andThen(function() {
    assert.equal(currentURL(), '/projects/new');
    assert.equal(find('.help-block').text(), 'name errors');
  });
});

test('can regenreate a projects token', function(assert) {
  assert.expect(4);

  const old = window.confirm;
  window.confirm = function() {
    assert.ok(true, 'it confirms the action');

    window.confirm = old;
    return true;
  };

  server.post('/api/v1/projects/1/regenerate-token', function(request) {
    assert.ok(true, 'it makes an ajax request to the regenerate end point');

    return [200, {"Content-Type": "application/json"},
      JSON.stringify({
        Project: {
          ID: '1',
          Token: 'new-token'
        }
      })];
  });

  authenticateSession({userID: '1'});

  visit('/projects/1/config');
  click("button:contains('Regenerate Token')");
  andThen(function() {
    assert.equal(find('#project-token').text(), 'new-token', 'it update the token');
    assert.equal(find('.flash-messages .alert').length, 1, 'it flashes a message');
  });
});
