import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  puller: Ember.inject.service('puller'),

  activate: function() {
    this.get('puller').on('global', this, 'onGlobalEvent');
    this.get('puller').on('accounts.1', this, 'onAccountEvent');
  },

  actions: {
    triggerNewError() {
      throw new Error('i threw an error' + Math.random());
    },

    sessionRequiresAuthentication() {
      this.get('puller').stop();
      this._super();
    }
  },

  onAccountEvent(event) {
    switch (event.Name) {
      case "errors.update":
        const id = Ember.get(event, 'Payload.Error.ID') + '';
        this.store.pushPayload(event.Payload);

        const error = this.store.recordForId('error', id);
        this.controllerFor('projects.project.errors').errorsUpdate(error);
    }
  },

  onGlobalEvent(e) {
    console.log('global', e);
  }
});
