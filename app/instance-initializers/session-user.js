//import Ember from 'ember';

export function initialize(application) {
  const container = application.container;
  const session = container.lookup('simple-auth-session:main');

  session.reopen({
    user: function() {
      const store = container.lookup('store:main');
      return store.find('user', 'me');
    }.property('content'),
  });
}

export default {
  name: 'session-user',
  initialize: initialize
};
