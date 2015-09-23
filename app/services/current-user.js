import Ember from 'ember';

const { isEmpty, inject } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  store: inject.service('store'),

  user: null,
  token: null,

  authenticated: function(userID, token) {
    if (isEmpty(userID) || isEmpty(token)) {
      return;
    }

    const store = this.get('store');
    return store.find('user', userID).then((u) => this.setUser(u, token));
  },

  setUser(user, token) {
    this.set('user', user);
    this.set('token', token);
    this.trigger('authenticated', user);
  }
});
