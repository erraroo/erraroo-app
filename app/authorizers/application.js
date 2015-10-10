import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { isEmpty, get } = Ember;

export default Base.extend({
  authorize(sessionData, block) {
    const token = get(sessionData, 'token');
    if (!isEmpty(token)) {
      block('Authorization', token);
    }
  },
});
