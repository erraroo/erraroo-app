import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'erraroo/tests/helpers/start-app';
import Pretender from 'pretender';

var application, user = {};

module('Acceptance: Projects', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /projects', function(assert) {
  assert.expect(4);

  const server = new Pretender(function() {
    this.get('/api/v1/users/1', function(request) {
      return [200, {"Content-Type": "application/json"},
        JSON.stringify({
          Users: {
            ID: "1",
            Email: "bob@example.com"
          }
        })];
    });

    this.get('/api/v1/projects', function(request) {
      const projects = JSON.stringify({
        Projects: [
          {ID: 1, Name: 'project one'},
          {ID: 2, Name: 'project two'}
        ]
      });
      return [200, {"Content-Type": "application/json"}, projects];
    });

    this.get('/api/v1/errors', function(request) {
      const projects = JSON.stringify({
        Errors: [
          {ID: 1, Message: 'error one'},
          {ID: 2, Message: 'error two'}
        ]
      });
      return [200, {"Content-Type": "application/json"}, projects];
    });
  });

  authenticateSession({token: '', userID: '1'});
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

  const server = new Pretender(function() {
    this.get('/api/v1/users/1', function(request) {
      return [200, {"Content-Type": "application/json"},
        JSON.stringify({
          Users: {
            ID: "1",
            Email: "bob@example.com"
          }
        })];
    });

    this.get('/api/v1/projects', function(request) {
      const projects = JSON.stringify({
        Projects: [
          {ID: 1, Name: 'project one'},
          {ID: 2, Name: 'project two'}
        ]
      });
      return [200, {"Content-Type": "application/json"}, projects];
    });

    this.post('/api/v1/projects', function(request) {
      const params = JSON.parse(request.requestBody);
      assert.equal('test project', params.Project.Name, 'it sends the correct project name');

      const project = JSON.stringify({
        Project: {
          ID: 1,
          Name: params.Project.Name,
          Token: 'PROJECT-TOKEN-1'
        }
      });
      return [201, {"Content-Type": "application/json"}, project];
    });
  });

  authenticateSession({token: '', userID: '1'});
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

  const server = new Pretender(function() {
    this.get('/api/v1/users/1', function(request) {
      return [200, {"Content-Type": "application/json"},
        JSON.stringify({
          Users: {
            ID: "1",
            Email: "bob@example.com"
          }
        })];
    });

    this.get('/api/v1/projects', function(request) {
      const projects = JSON.stringify({
        Projects: [
          {ID: 1, Name: 'project one'},
          {ID: 2, Name: 'project two'}
        ]
      });
      return [200, {"Content-Type": "application/json"}, projects];
    });

    this.post('/api/v1/projects', function(request) {
      const params = JSON.parse(request.requestBody);
      assert.equal('test project', params.Project.Name);

      const project = JSON.stringify({Errors: {Name: ['name errors']}});
      return [400, {"Content-Type": "application/json"}, project];
    });
  });

  authenticateSession({token: '', userID: '1'});
  visit('/projects/new');
  fillIn('#name', 'test project');
  click("button:contains('Create Project')");

  andThen(function() {
    assert.equal(currentURL(), '/projects/new');
    assert.equal(find('.help-block').text(), 'name errors');
  });
});
