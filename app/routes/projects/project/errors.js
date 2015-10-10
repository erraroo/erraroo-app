import Ember from 'ember';
import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  queryParams: {
    status: {
      refreshModel: true,
      replace: true,
    },

    page: {
      refreshModel: true,
      replace: true,
    },
  },

  model: function(params) {
    return this.store.query('error', {
      project_id: this.modelFor('projects.project').get('id'),
      status: params.status,
      page: params.page,
    });
  },

  setupController: function(controller, model) {
    controller.setErrors(model);
  },

  actions: {
    resolveAllErrors() {
      const controller = this.controllerFor('projects.project.errors');
      const promises = controller.get('model').map(function(error) {
        return error.resolve();
      });

      Ember.RSVP.allSettled(promises).then(() => this.refresh());
    },

    changeStatus(status) {
      this.transitionTo({queryParams: { status: status} });
    },
  }
});
