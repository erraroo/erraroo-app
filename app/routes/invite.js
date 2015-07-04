import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    console.log('model');
    return this.store.createRecord('invitation');
  },

  deactivate: function() {
    if (this.currentModel.get('isNew')) {
      this.currentModel.rollback();
    }
  },

  actions: {
    save() {
      const that = this;
      this.currentModel.save().then(function() {
        that.refresh();
        console.log('TODO: flash message');
      }, function() {
        console.log('failed', arguments);
      });
    }
  }

});
