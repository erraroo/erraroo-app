import Ember from 'ember';
import config from 'erraroo/config/environment';

const run = Ember.run;
const get = Ember.get;

export default Ember.Route.extend({
  model: function(params) {
    return Ember.Object.create({
      token: params.token,
      password: '',
    });
  },

  actions: {
    resetPassword() {
      const that = this;
      const data = this.currentModel.getProperties('token', 'password');

      function success() {
        run(that, 'success');
      }

      function failure(response) {
        run(that, 'failure', response);
      }

      Ember.$.ajax({
        url: config.apiHost + '/api/v1/passwordRecovers/' + data.token,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
      }).then(success, failure);
    }
  },

  failure: function(response) {
    const errors = get(response, 'responseJSON.Errors');
    this.currentModel.set('errors', errors);
  },

  success: function() {
    this.transitionTo('login');
    get(this, 'flashMessages').success('Reset your password.  Try logging in now');
  }
});
