import Ember from 'ember';

const { isNone } = Ember;

export function startLine(params/*, hash*/) {
  if (isNone(params)) {
    return 0;
  }

  const frame = params[0];
  if (isNone(frame.origLine) || frame.origLine === 0) {
    return 0;
  }

  if (isNone(frame.preContext)) {
    return 0;
  }

  return frame.origLine - frame.preContext.length;
}

export default Ember.Helper.helper(startLine);
