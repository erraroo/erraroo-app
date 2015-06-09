import Ember from 'ember';

export function startLine(params/*, hash*/) {
  if (Ember.isNone(params)) {
    return 0;
  }

  const frame = params[0];
  if (Ember.isNone(frame.origLine) || frame.origLine === 0) {
    return 0;
  }

  if (Ember.isNone(frame.preContext)) {
    return 0;
  }


  return frame.origLine - frame.preContext.length;
}

export default Ember.HTMLBars.makeBoundHelper(startLine);
