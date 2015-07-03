import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = { withCredentials: false };

    const token = this.get('session.secure.token');
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      jqXHR.setRequestHeader('Authorization', token);
    }
  }
});
