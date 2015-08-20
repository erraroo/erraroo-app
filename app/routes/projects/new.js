import Authenticated from '../authenticated';
import CleanUpModel from 'erraroo/mixins/clean-up-model';

export default Authenticated.extend(CleanUpModel, {
  model: function() {
    return this.store.createRecord('project');
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
