import Authenticated from '../authenticated';

export default Authenticated.extend({
  actions: {
    save: function() {
      const that = this;

      function success(model) {
        console.log("saved project", model, that);
      }

      function error(e) {
        console.error('error', e);
      }

      this.currentModel.save().then(success, error);
    }
  }
});
