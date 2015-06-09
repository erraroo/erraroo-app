import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = { withCredentials: false };
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.token'))) {
      jqXHR.setRequestHeader('Authorization', this.get('session.token'));
    }
  }
});
