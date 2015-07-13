import DS from 'ember-data';
import Ember from 'ember';
import config from 'erraroo/config/environment';

export default DS.RESTAdapter.extend({
  host: config.apiHost,
  namespace: 'api/v1',

  shouldReloadAll() {
    //console.log('shouldReloadAll', arguments);
    return false;
  },

  shouldBackgroundReloadRecord() {
    //console.log('shouldBackgroundReloadRecord', arguments);
    return false;
  },

  ajax: function(url, method, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    return this._super(url, method, hash);
  },

  ajaxError: function(jqXHR) {
    var error = this._super(jqXHR);

    if (jqXHR && jqXHR.status === 400) {
      var response = Ember.$.parseJSON(jqXHR.responseText),
      errors = {};

      if (response.Errors !== undefined) {
        var jsonErrors = response.Errors;

        Ember.keys(jsonErrors).forEach(function(key) {
          errors[key.camelize()] = jsonErrors[key];
        });
      }

      return new DS.InvalidError(errors);
    } else {
      return error;
    }
  },
});
