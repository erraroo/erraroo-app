import {
  timeAgo
} from '../../../helpers/time-ago';
import { module, test } from 'qunit';

module('TimeAgoHelper');

test('formats time since a date', function(assert) {
  var result = timeAgo(new Date());
  assert.equal(result, 'a few seconds ago');
});
