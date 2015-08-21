import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import '../helpers/controller';
import '../helpers/signin';

// Can't figure out how to import these from ember-simple-auth.
// The testing package is broken for what ever reason.
const sessionName = 'session:main';
Ember.Test.registerAsyncHelper('invalidateSession', function(app) {
  var session = app.__container__.lookup(sessionName);
  if (session.get('isAuthenticated')) {
    session.invalidate();
  }
  return wait();
});

Ember.Test.registerAsyncHelper('authenticateSession', function(app, sessionData) {
  var session = app.__container__.lookup(sessionName);
  session.authenticate('authenticator:test', sessionData);
  return wait();
});

Ember.Test.registerHelper('currentSession', function(app) {
  var session = app.__container__.lookup(sessionName);
  return session;
});

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
