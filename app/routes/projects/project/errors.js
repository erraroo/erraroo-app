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

    tags: {
      refreshModel: true,
      replace: true,
    }
  },

  model: function(params) {
    return this.store.query('error', {
      project_id: this.modelFor('projects.project').get('id'),
      status: params.status,
      tags: params.tags,
      library: params.library,
    });
  },

  setupController: function(controller, model) {
    controller.setErrors(model);
  },

  actions: {
    resolveAllErrors: function() {
      const controller = this.controllerFor('projects/project/errors');
      controller.get('model').invoke('resolve');
    },
  }
});
