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

    mute(error) {
      error.toggleProperty('muted');
      error.save();
    },

    deleteProject() {
      if (confirm('Are you sure you want to delete this project?')) {
        const that = this;
        this.currentModel.destroyRecord().then(function() {
          that.transitionTo('index');
          that.get('flashMessages').success('That terrible project was destroyed!');
        });
      }
    }
  }
});
