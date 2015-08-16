import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;
const { computed, isEmpty} = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  user: computed('session.data.secure.userID', function() {
    const userID = this.get('session.data.secure.userID');
    console.log("user", userID);
    if (!isEmpty(userID)) {
      return DS.PromiseObject.create({
        promise: this.get('store').find('user', `${userID}`)
      });
    }
  })
});
