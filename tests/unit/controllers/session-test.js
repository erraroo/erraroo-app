import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:session', {
  // needs: ['controller:foo']
});

test('is not authenticated by default', function(assert) {
  var controller = this.subject();
  Ember.run(controller, 'set', 'user', null);
  assert.equal(controller.get('isAuthenticated'), false);
});

test('authenticated with a user set', function(assert) {
  var controller = this.subject();
  Ember.run(controller, 'signin', {id: '1'});
  assert.equal(controller.get('isAuthenticated'), true);
});

