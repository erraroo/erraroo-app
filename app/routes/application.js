import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import erraroo from 'ember-cli-erraroo/erraroo';

const { inject } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: inject.service('current-user'),
  puller: inject.service('puller'),

  activate: function() {
    this.get('puller').on('global', this, 'onGlobalEvent');
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
      console.error('TODO: errarro is swallowing this not nicely', err);
      erraroo.reportApplicationRouteError(err, transition);
    },

    didTransition(/*transition*/) {
      window.scrollTo(0,0);
    }
  },

  setupEvents: Ember.on('init', function() {
    this.get('currentUser').on('authenticated', this, 'authenticated');
  }),

  authenticated: function(user) {
    this.get('puller').on(user.get('accountChannel'), this, 'onAccountEvent');
    this.setupErraroo(user);
  },

  setupErraroo(user) {
    erraroo.userdata = {
      id: user.get('id'),
      email: user.get('email'),
    };
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
