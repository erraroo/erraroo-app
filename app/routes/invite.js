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
      const flash = Ember.get(this, 'flashMessages');
      const that = this;
      this.currentModel.save().then(function(invite) {
        that.refresh();

        const email = invite.get('address');
        flash.success(`${email} was invited!`);
        window.x = flash;
      }, function() {
        console.log('failed', arguments);
      });
    }
  }

});
