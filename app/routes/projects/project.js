import Ember from 'ember';
import Authenticated from '../authenticated';

export default Authenticated.extend({
  actions: {
    save() {
      const that = this;

      function success(model) {
        console.log("saved project", model, that);
      }

      function error(e) {
        console.error('error', e);
      }

      this.currentModel.save().then(success, error);
    },

    deleteProject() {
      if (confirm('Are you sure you want to delete this project?')) {
        const that = this;
        this.currentModel.destroyRecord().then(function() {
          that.transitionTo('index');
          that.get('flashMessages').success('That mean old crufty project was destroyed!');
        });
      }
    },

    regenerateToken() {
      if (confirm('Are you sure you want to regenerate the projects token?  This will stop all incoming data from clients using the existing token!')) {
        const flash = this.get('flashMessages');
        this.currentModel.regenerateToken().then(function() {
          Ember.run(flash, 'success', "Your project's token has been regenerated");
        }, function() {
          console.error(...arguments);
        });
      }
    }
  }
});
