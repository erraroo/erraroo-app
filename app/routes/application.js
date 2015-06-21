import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    triggerNewError: function() {
      throw new Error('i threw an error' + Math.random());
    },
  },
});
