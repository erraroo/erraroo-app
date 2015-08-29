import Ember from 'ember';

export function pluralize(params/*, hash*/) {
  const count = params[1];
  let word = params[0];

  if (count > 1) {
    word = `${word}s`;
  }

  return word;
}

export default Ember.Helper.helper(pluralize);
