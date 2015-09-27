import Authenticated from '../authenticated';
import CleanUpModel from 'erraroo/mixins/clean-up-model';

export default Authenticated.extend(CleanUpModel, {
  model: function() {
    return this.store.createRecord('project');
  },

  actions: {
    save: function() {
      this.currentModel.save().then(
        (model) => this.transitionTo('projects.project.install', model),
        () => console.error(...arguments)
      );
    }
  }
});
