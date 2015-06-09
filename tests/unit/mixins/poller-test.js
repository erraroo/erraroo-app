import Ember from 'ember';
import PollerMixin from '../../../mixins/poller';
import { module, test } from 'qunit';

module('PollerMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PollerObject = Ember.Object.extend(PollerMixin);
  var subject = PollerObject.create();
  assert.ok(subject);
});
