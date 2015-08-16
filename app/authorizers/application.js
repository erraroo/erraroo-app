import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize(block) {
    let token = this.get('session.secure.token');
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      block('Authorization', token);
    }
  },
});
