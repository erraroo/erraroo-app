import Ember from 'ember';
import config from 'erraroo/config/environment';

export default Ember.Mixin.create({
  interval: 1000 * config.defaultPollIntervalSeconds,

  schedule: function(f) {
    if (config.environment === 'test') {
      console.log('not polling');
      return;
    }

    const that = this;
    return Ember.run.later(function() {
      const promise = f.apply(that);
      promise.then(function() {
        that.set('timer', that.schedule(f));
      });
    }, this.get('interval'));
  },

  stopPoll: function() {
    Ember.run.cancel(this.get('timer'));
  },

  startPoll: function() {
    //this.set('timer', this.schedule(this.get('poll')));
  },
});
