import Ember from 'ember';
import config from 'erraroo/config/environment';
const {
  isNone,
  run,
  set,
  get,
  inject,
} = Ember;

const max = 30000;
const norm = 500;

let errorCount = 0;
let stoped = true;
let interval = norm;
let request = null;

const channels = {};

export default Ember.Service.extend(Ember.Evented, {
  session: inject.service('session'),

  on(channel, target, method) {
    if (!this.has(channel)) {
      channels[channel] = 0;
    }

    this._super(channel, target, method);

    if (request) {
      return request.abort();
    }
  },

  off(channel, target, method) {
    this._super(channel, target, method);

    if (!this.has(channel)) {
      delete channels[channel];
    }

    if (request) {
      return request.abort();
    }
  },

  schedule() {
    if (config.environment === 'test') {
      return;
    }

    if (stoped) {
      set(this, 'timer', null);
      return;
    }

    const that  = this;
    const timer = run.later(function() {
      const promise = that.poll.apply(that);
      promise.always(function() {
        that.schedule();
      });
    }, interval);

    set(this, 'timer', timer);
  },

  stop() {
    run.cancel(get(this, 'timer'));
    stoped = true;
  },

  start() {
    stoped = false;
    if (!get(this, 'timer')) {
      this.schedule();
    }
  },

  poll() {
    const that = this;
    let aborted = false;

    request = Ember.$.ajax({
      cache: false,

      url: config.apiHost + '/api/v1/backlog',
      type: 'POST',
      data: channels,
      contentType: 'application/json',
      headers: {
        'Authorization': this.get('session.session.secure.token'),
        'X-No-Loggy': true,
      },

      success: function(backlog) {
        if (isNone(backlog)) {
          return;
        }

        run(that, 'handleBacklog', backlog);
        errorCount = 0;
      },

      error: function(e) {
        if (e.statusText === 'abort') {
          aborted = true;
        } else {
          errorCount += 1;
        }
      },

      complete: function() {
        if (aborted || errorCount === 0) {
          interval = norm;
        } else {
          interval = interval * errorCount;
          if (interval > max) {
            interval = max;
          }
        }
      }
    });

    return request;
  },

  handleBacklog(backlog) {
    const that = this;

    Object.keys(backlog.Channels).forEach(function(key) {
      channels[key] = backlog.Channels[key];
    });

    Ember.A(backlog.Messages).forEach(function(message) {
      that.handleMessage(message.Channel, message.Payload);
    });
  },

  handleMessage(channel, event) {
    if (isNone(event) || isNone(channel)) {
      return;
    }

    this.trigger(channel, event);
  }
});
