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
    const controller = this.controllerFor('projects/project/groups');
    return this.model().then(function(groups) {
      controller.setGroups(groups);
    });
  },

  actions: {
    resolveAllErrors: function() {
      // TODO - make this an api call
      this.currentModel.forEach(function(model) {
        if (!model.get('resolved')) {
          model.set('resolved', true);
          model.save();
        }
      });
    },
  }
});
