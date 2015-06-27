import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import Poller from 'erraroo/mixins/poller';

export default Ember.Route.extend(ApplicationRouteMixin, Poller, {
  actions: {
    triggerNewError: function() {
      throw new Error('i threw an error' + Math.random());
    },
  },

  activate: function() {
    this.startPoll();
    window.x = this;
  },

  deactivate: function() {
    this.stopPoll();
  },

  channels: {
    'global': 0,
    'accounts.1': 0,
  },

  subscribe: function(channel) {
    this.channels[channel] = 0;
  },

  poll: function() {
    const that = this;
    return Ember.$.post('http://localhost:3000/api/v1/backlog', that.channels).then(function(backlog) {
      if (Ember.isNone(backlog)) {
        return;
      }

      Ember.keys(backlog.Channels).forEach(function(key) {
        that.channels[key] = backlog.Channels[key];
      });

      Ember.A(backlog.Messages).forEach(function(message) {
        that.handleEvent(message.Payload);
      });
    });
  },

  interval: 1000,

  handleEvent: function(event) {
    if (Ember.isNone(event)) {
      return;
    }

    if (event.Name === 'errors.update') {
      const id = Ember.get(event, 'Payload.Error.ID') + '';
      this.store.pushPayload(event.Payload);

      const error = this.store.getById('error', id);
      this.controllerFor('projects.project.errors').errorsUpdate(error);
    }
  }
});
