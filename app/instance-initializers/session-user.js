import Ember from 'ember';

export function initialize(application) {
  //const container = application.container;
  //const session = container.lookup('simple-auth-session:main');

  //session.reopen({
    //user: function() {
      //const store = container.lookup('service:store');
      //const userID = this.get('content.secure.userID');
      //return store.find('user', userID || 'me');
    //}.property('content.secure.userID'),
  //});
}

export default {
  name: 'session-user',
  initialize: initialize
};
