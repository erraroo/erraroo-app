import { pluralize } from '../../../helpers/pluralize';
import { module, test } from 'qunit';

module('Unit | Helper | pluralize');

test('pluralize simple words', function(assert) {
  [
    { args: ['test', 0], expected: 'test' },
    { args: ['test', 1], expected: 'test' },
    { args: ['test', 2], expected: 'tests'}
  ].forEach(function(e) {
    assert.equal(pluralize(e.args), e.expected);
  });
});
