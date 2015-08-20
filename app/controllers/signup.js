import Ember from 'ember';
import config from 'erraroo/config/environment';

export default Ember.Controller.extend({
  email: '',
  password: '',
  session: Ember.inject.service('session'),

  actions: {
    signup: function() {
      const controller = this;

      function success(response) {
        Ember.run(controller, 'success', response);
      }

      function failure(response) {
        Ember.run(controller, 'failure', response.responseJSON);
      }

      Ember.$.ajax({
        url: config.apiHost + '/api/v1/signups',
        type: 'POST',
        data: JSON.stringify(this.signupRequestData()),
        dataType: 'json',
      }).then(success, failure);
    }
  },

  signupRequestData: function() {
    return {
      Signup: {
        Email:    this.get('email'),
        Password: this.get('password'),
      }
    };
  },

  failure: function(response) {
    this.set('errors', response.Errors);
  },

  success: function() {
    const that = this;
    this.get('session').authenticate('authenticator:application', this.loginRequestData()).then(function() {
      that.reset();
    });
  },

  loginRequestData: function() {
    return {
      Signin: {
        Email:    this.get('email'),
        Password: this.get('password'),
      }
    };
  },

  reset: function() {
    this.setProperties({email: '', password: ''});
  },
});
