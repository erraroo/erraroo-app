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
    assert.equal(currentURL(), '/projects/1/config', 'redirects to the projects configuration page');
    assert.equal(find('#project-token').text().trim(), 'PROJECT-TOKEN-1', 'it shows the token to the user');
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
