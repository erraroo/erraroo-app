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
    authenticateSession();
    currentSession().get('user', user);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /projects', function(assert) {
  assert.expect(4);

  const server = new Pretender(function() {
    this.get('/api/v1/users/me', function(request) {
      return [200, {"Content-Type": "application/json"},
        JSON.stringify({
          Users: {
            ID: "1",
            Email: "bob@example.com"
          }
        })];
    }),

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
          {ID: 1, Name: 'project one'},
          {ID: 2, Name: 'project two'}
        ]
      });
      return [200, {"Content-Type": "application/json"}, projects];
    });
  });
  visit('/projects');

  andThen(function() {
    assert.equal(currentURL(), '/projects/1/errors');
    //assert.equal(find('.projects .name').length, 2);
    //assert.equal(find('.projects .name:eq(0)').text().trim(), 'project one');
    //assert.equal(find('.projects .name:eq(1)').text().trim(), 'project two');
  });
});

test('creating a project', function(assert) {
  assert.expect(3);

  const server = new Pretender(function() {
    this.post('/api/v1/projects', function(request) {
      const params = JSON.parse(request.requestBody);
      assert.equal('test project', params.Project.Name);

      const project = JSON.stringify({
        Project: {
          ID: 1,
          Name: params.Project.Name,
          Token: 'PROJECT-TOKEN-1'
        }
      });
      return [201, {"Content-Type": "application/json"}, project];
    });
    this.get('/api/v1/groups', function(request) {
      const groups = JSON.stringify({Groups: []});
      return [200, {"Content-Type": "application/json"}, groups];
    });
  });

  visit('/projects/new');
  fillIn('#name', 'test project');
  click("button:contains('Create Project')");

  andThen(function() {
    assert.equal(currentURL(), '/project/1');
    assert.equal(find('.token').text().trim(), 'PROJECT-TOKEN-1');
  });
});

test('project show errors', function(assert) {
  assert.expect(3);

  const server = new Pretender(function() {
    this.post('/api/v1/projects', function(request) {
      const params = JSON.parse(request.requestBody);
      assert.equal('test project', params.Project.Name);

      const project = JSON.stringify({Errors: {Name: ['name errors']}});
      return [400, {"Content-Type": "application/json"}, project];
    });
  });

  visit('/projects/new');
  fillIn('#name', 'test project');
  click("button:contains('Create Project')");

  andThen(function() {
    assert.equal(currentURL(), '/projects/new');
    assert.equal(find('.help-block').text(), 'name errors');
  });
});
