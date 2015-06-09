//import Ember from 'ember';

export function initialize(application) {
  const container = application.container;
  const session = container.lookup('simple-auth-session:main');
  const store = container.lookup('store:application');

  session.reopen({
    user: function() {
      return store.find('user', 'me');
    }.property('content'),
  });
}

export default {
  name: 'session-user',
  initialize: initialize
};
