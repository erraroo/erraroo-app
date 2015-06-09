import Ember from 'ember';
/* global moment */

export function timeAgo(params/*, hash*/) {
  return moment(params[0]).fromNow();
}

export default Ember.HTMLBars.makeBoundHelper(timeAgo);
