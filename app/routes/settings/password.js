import Ember from 'ember';
import config from 'erraroo/config/environment';
import Authenticated from 'erraroo/routes/authenticated';

const request = Ember.Object.extend({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  errors: null,

  clear() {
    this.setProperties({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      errors: null,
    });
  },

  encode() {
    return this.getProperties(
      'currentPassword',
      'newPassword',
      'confirmNewPassword'
    );
  }
});

export default Authenticated.extend({
  model() {
    return request.create();
  },

  deactivate: function() {
    this.currentModel.clear();
  },

  actions: {
    changePassword(model) {
      const data = model.encode();
      const route = this;
      function success(response) {
        Ember.run(route, 'success', model, response);
      }

      function failure(response) {
        Ember.run(route, 'failure', model, response);
      }

      Ember.$.ajax({
        url: config.apiHost + '/api/v1/passwords',
        type: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
      }).then(success, failure);
    }
  },

  success(model, response) {
    this.get('flashMessages').success(response.Message);
    model.clear();
  },

  failure(model, response) {
    const json = response.responseJSON;
    model.set('errors', json.Errors);
  },
});
