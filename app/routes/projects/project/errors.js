import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  queryParams: {
    status: {
      refreshModel: true,
      replace: true,
    },

    library: {
      refreshModel: true,
      replace: true,
    },

    page: {
      refreshModel: true,
      replace: true,
    }
  },

  model: function(params) {
    return this.store.query('error', {
      project_id: this.modelFor('projects.project').get('id'),
      status: params.status,
      library: params.library,
      page: params.page,
    });
  },

  setupController: function(controller, model) {
    controller.setErrors(model);
  },

  actions: {
    resolveAllErrors() {
      const controller = this.controllerFor('projects/project/errors');
      controller.get('model').invoke('resolve');
    },

    changeStatus(status) {
      console.log("changeStatus", status, 'things');
      this.transitionTo({queryParams: { status: status} });
    },
  }
});
