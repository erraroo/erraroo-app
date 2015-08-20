import Ember from 'ember';
export default Ember.Mixin.create({
  deactivate: function() {
    this._super(...arguments);
    if (this.currentModel.get('isNew')) {
      this.currentModel.deleteRecord();
    }
  },
});

