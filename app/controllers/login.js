import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
      const controller = this;

      function success(response) {
        Ember.run(controller, 'success', response);
      }

      function failure(errors) {
        Ember.run(controller, 'failure', errors);
      }

      this.get('session').authenticate('authenticator:application',
        this.loginRequestData()).then(success, failure);
    }
  },

  loginRequestData: function() {
    return {
      Signin: {
        Email:    this.get('email'),
        Password: this.get('password'),
      }
    };
  },

  success: function() {
    this.reset();
  },

  failure: function(errors) {
    if (!Ember.isNone(errors)) {
      this.set('message', errors.Errors.Signin);
    }
  },

  reset: function() {
    this.setProperties({
      email: '',
      password: ''
    });
  }

});
