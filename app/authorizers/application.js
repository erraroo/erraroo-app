import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { computed, isEmpty, get } = Ember;
const { oneWay } = computed;

export default Base.extend({
  token: oneWay('session.authenticated.token'),
  isAuthenticated: oneWay('session.isAuthenticated'),

  authorize(block) {
    const token = get(this, 'token');
    if (get(this, 'isAuthenticated') && !isEmpty(token)) {
      block('Authorization', token);
    }
  },
});
