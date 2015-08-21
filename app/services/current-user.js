import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;
const { computed, isEmpty} = Ember;

export default Ember.Service.extend(Ember.Evented, {
  store: service(),

  user: null,

  authenticated: function(userID) {
    const that = this;
    this.get('store').find('user', userID).then(function(u) {
      that.setProperties({
        user: u,
      });
      that.trigger('authenticated', u);
    });
  }
});
