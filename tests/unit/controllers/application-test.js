import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:application', {
  needs: ['controller:session']
});

test('isAuthenticated', function(assert) {
  var controller = this.subject();
  assert.equal(false, controller.get('isAuthenticated'));
});
