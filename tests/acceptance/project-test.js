import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'erraroo/tests/helpers/start-app';
import Pretender from 'pretender';

var application, user = {};

module('Acceptance: Project', {
  beforeEach: function() {
    application = startApp();
    signin(user);
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /project/:project_id', function(assert) {
  assert.expect(10);

  const server = new Pretender(function() {
    this.get('/api/v1/projects/1', function(request) {
      const project = JSON.stringify({
        Project: {
          ID: 1,
          Name: 'project name',
          Token: 'PROJECT-TOKEN-1'
        }
      });
      return [200, {"Content-Type": "application/json"}, project];
    });

    this.get('/api/v1/groups', function(request) {
      assert.equal(request.queryParams.project_id, "1");

      const groups = JSON.stringify({
        Groups: [{
          ID: 1,
          Checksum: 'xxx',
          ProjectID: 1,
          Message: 'message',
          Resolved: false,
          Occurrences: 9,
          LastSeenAt: new Date(),
        },{
          ID: 2,
          Checksum: 'zzz',
          ProjectID: 1,
          Message: '',
          Resolved: false,
          Occurrences: 1,
          LastSeenAt: new Date(),
        },
        ]
      });

      return [200, {"Content-Type": "application/json"}, groups];
    });
  });

  visit('/project/1');
  andThen(function() {
    assert.equal(currentURL(), '/project/1');
    assert.equal(find('.token').text().trim(), 'PROJECT-TOKEN-1');
    assert.equal(find('.groups .group').length, 2);

    const $groups = find('.groups .group');
    const $group1 = $($groups[0]);
    assert.equal($group1.find('.group-occurrences').text().trim(), '9');
    assert.equal($group1.find('.group-message').text().trim(), 'message');
    assert.equal($group1.find('.group-last-seen-at').text().trim(), 'Last seen a few seconds ago.');

    const $group2 = $($groups[1]);
    assert.equal($group2.find('.group-occurrences').text().trim(), '1');
    assert.equal($group2.find('.group-message').text().trim(), '(no message)');
    assert.equal($group2.find('.group-last-seen-at').text().trim(), 'Last seen a few seconds ago.');
  });
});

test('visiting /project/:project_id and resolving a group', function(assert) {
  assert.expect(3);

  const server = new Pretender(function() {
    this.get('/api/v1/projects/1', function(request) {
      const project = JSON.stringify({Project: {ID: 1,Name: 'project name',Token: 'PROJECT-TOKEN-1'}});
      return [200, {"Content-Type": "application/json"}, project];
    });

    this.get('/api/v1/groups', function(request) {
      const groups = JSON.stringify({Groups: [{ID: 1,Checksum: 'xxx',ProjectID: 1,Message: 'message',resolved: false,occurrences: 9,}]});
      return [200, {"Content-Type": "application/json"}, groups];
    });

    this.put('/api/v1/groups/1', function(request) {
      const params = JSON.parse(request.requestBody);
      assert.equal(true, params.Group.Resolved);

      const group = JSON.stringify({Group:{ID: 1,Checksum: 'xxx',ProjectID: 1,Message: 'message',resolved: true,occurrences: 9,}});
      return [200, {"Content-Type": "application/json"}, group];
    });
  });

  visit('/project/1');
  andThen(function() {
    assert.equal(find('.group.unresolved').length, 1);
  });

  click('button.status-button');
  andThen(function() {
    assert.equal(find('.group.unresolved').length, 0);
  });
});

test('visiting /project/:project_id and navigating to a group', function(assert) {
  assert.expect(3);

  const server = new Pretender(function() {
    this.get('/api/v1/projects/1', function(request) {
      const project = JSON.stringify({Project: {ID: 1,Name: 'project name',Token: 'PROJECT-TOKEN-1'}});
      return [200, {"Content-Type": "application/json"}, project];
    });

    this.get('/api/v1/groups', function(request) {
      const groups = JSON.stringify({Groups: [{ID: 1,Checksum: 'xxx',ProjectID: 1,Message: 'message',resolved: false,occurrences: 9,}]});
      return [200, {"Content-Type": "application/json"}, groups];
    });

    this.get('/api/v1/errors', function(request) {
      assert.equal(request.queryParams.group_id, "1", 'includes the group id');
      assert.equal(request.queryParams.project_id, "1", 'includes the project id');

      const errors = JSON.stringify({Errors: [{ID: 1}]});
      return [200, {"Content-Type": "application/json"}, errors];
    });
  });

  visit('/project/1');
  click('.groups .group a');
  andThen(function() {
    assert.equal(currentURL(), '/project/1/group/1/error/1');
  });
});
