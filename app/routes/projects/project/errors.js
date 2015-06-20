import Authenticated from 'erraroo/routes/authenticated';
import Poller from 'erraroo/mixins/poller';

export default Authenticated.extend(Poller, {
  model: function(/*params*/) {
    return this.store.query('error', {
      project_id: this.modelFor('projects.project').get('id'),
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
});
