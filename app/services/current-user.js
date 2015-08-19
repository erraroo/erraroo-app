import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;
const { computed, isEmpty} = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  user: computed('session.session.secure.userID', function() {
    const userID = this.get('session.session.secure.userID');
    if (!isEmpty(userID)) {
      return DS.PromiseObject.create({
        promise: this.get('store').find('user', `${userID}`)
      });
    }

    return null;
  })
});
