import Authenticated from '../authenticated';

export default Authenticated.extend({
  model: function() {
    return this.store.createRecord('project');
  },

  deactivate: function() {
    if (this.currentModel.get('isNew')) {
      this.currentModel.rollback();
    }
  },

  actions: {
    save: function() {
      const that = this;

      function success(model) {
        that.transitionTo('projects.project.config', model);
      }

      function error(e) {
        console.log('error', e);
      }

      this.currentModel.save().then(success, error);
    }
  }
});
