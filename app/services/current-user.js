import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;
const { computed, isEmpty} = Ember;

export default Ember.Service.extend({
  userID: null,

  session: service('session'),
  store: service(),

  user: computed('userID', function() {
    const userID = this.get('userID');
    if (!isEmpty(userID)) {
      return DS.PromiseObject.create({
        promise: this.get('store').find('user', `${userID}`)
      });
    }

    return null;
  }),
});
