import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import erraroo from 'ember-cli-erraroo/erraroo';

const { inject } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: inject.service('current-user'),
  session: inject.service('session'),
  puller: inject.service('puller'),

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
    },

    invalidateSession() {
      this.get('session').invalidate();
    },

    error(err, transition) {
      erraroo.reportApplicationRouteError(err, transition);
    }
  },

  sessionUserChanged: Ember.observer('currentUser.user.id', function() {
    erraroo.userdata = {
      id: this.get('currentUser.user.id'),
      email: this.get('currentUser.user.email')
    };
  }).on('init'),

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
