import Ember from 'ember';
/* global c3 */

export default Ember.Component.extend({
  classNames: 'timing-chart',

  didInsertElement:function() {
    const events = [
     'appcacheTime',
     'redirectTime',
     'lookupDomainTime',
     'connectTime',
     'requestTime',
     'unloadEventTime',
     'firstPaintTime',
     'initDomTreeTime',
     'domReadyTime',
     'loadEventTime',
     'loadTime',
    ];

    c3.generate({
      bindto: '#chart',
      data: {
        json: this.get('timings').getEach('timingData'),
        keys: {
          x: 'createdAt',
          value: events,
        },
        type: 'area',
        groups: [events],
      },
      point: {
        show: false,
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d %H:%M'
          }
        }
      },
    });
  },
});
