import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:projects/new');

test('cleans up the model on deactivate', function(assert) {
  let called = false;
  const route = this.subject();
  const model = Ember.Object.create({
    isNew: true,
    rollback: function() {
      called = true;
    }
  });

  route.currentModel = model;
  route.deactivate();
  assert.ok(called, 'should have called rollback on the model');
});
