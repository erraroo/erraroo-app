import Authenticated from 'erraroo/routes/authenticated';
import Poller from 'erraroo/mixins/poller';

export default Authenticated.extend(Poller, {
  queryParams: {
    status: {
      refreshModel: true,
      replace: true,
    }
  },

  model: function(params) {
    return this.store.query('error', {
      project_id: this.modelFor('projects.project').get('id'),
      status: params.status,
    });
  },

  activate: function() {
    this.startPoll();
  },

  deactivate: function() {
    this.stopPoll();
  },

  poll: function() {
    const params = this.paramsFor('projects.project.errors');
    const controller = this.controllerFor('projects/project/errors');
    return this.model(params).then(function(errors) {
      controller.setErrors(errors);
    });
  },

  actions: {
    resolveAllErrors: function() {
      // TODO - make this an api call
      const controller = this.controllerFor('projects/project/errors');
      controller.get('model').forEach(function(model) {
        if (!model.get('resolved')) {
          model.set('resolved', true);
          model.save();
        }
      });
    },
  }
});
