import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;
const { computed, isEmpty} = Ember;

const SIMPLE_AUTH_USER_ID_PATH = 'session.session.content.secure.userID';

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  user: computed(SIMPLE_AUTH_USER_ID_PATH, function() {
    console.log('userID', this.get(SIMPLE_AUTH_USER_ID_PATH));

    const userID = this.get(SIMPLE_AUTH_USER_ID_PATH);
    if (!isEmpty(userID)) {
      return DS.PromiseObject.create({
        promise: this.get('store').find('user', `${userID}`)
      });
    }

    return null;
  })

});
