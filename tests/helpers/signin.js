import Ember from 'ember';

Ember.Test.registerHelper('signin', function (app, user) {
  const sessions = app.__container__.lookup('controller:session');
  sessions.signin(user);
});
