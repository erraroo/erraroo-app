import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('invitation', params.token);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('email', model.get('address'));
  },

  actions: {
    error() {
      console.log('errrrr');
      this.transitionTo('invitation-not-found');
    }
  }
});
