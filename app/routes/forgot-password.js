import Ember from 'ember';
import config from 'erraroo/config/environment';

export default Ember.Route.extend({
  model: function() {
    return Ember.Object.create({email: '', message: ''});
  },

  actions: {
    requestPassword(email) {
      this.currentModel.set('message', '');
      const that = this;
      function success() {
        Ember.run(that, 'success');
      }

      function failure() {
        Ember.run(that, 'failure');
      }

      Ember.$.ajax({
        url: config.apiHost + '/api/v1/passwordRecovers',
        type: 'POST',
        data: JSON.stringify({email: email}),
        dataType: 'json',
      }).then(success, failure);
    }
  },

  failure: function() {
    console.log("casdfasdf");
    this.currentModel.set('message', 'email not found');
  },

  success: function() {
    this.get('flashMessages').success('Check your email! We sent you a password link.');
  }
});
