import Ember from 'ember';

const { isEmpty, inject } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  store: inject.service('store'),

  user: null,

  authenticated: function(userID) {
    if (isEmpty(userID)) {
      return;
    }

    const store = this.get('store');
    store.find('user', userID).then((u) => this.setUser(u));
  },

  setUser(user) {
    this.set('user', user);
    this.trigger('authenticated', user);
  }
});
