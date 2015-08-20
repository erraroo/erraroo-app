import Ember from 'ember';
import CleanUpModel from 'erraroo/mixins/clean-up-model';

export default Ember.Route.extend(CleanUpModel, {
  model: function() {
    console.log('model');
    return this.store.createRecord('invitation');
  },

  actions: {
    save() {
      const flash = Ember.get(this, 'flashMessages');
      const that = this;
      this.currentModel.save().then(function(invite) {
        that.refresh();

        const email = invite.get('address');
        flash.success("" + email + " was invited!");
      }, function() {
        flash.danger("Invite not sent");
      });
    }
  }
});
