import Ember from 'ember';
import DS from 'ember-data';
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

  isInvalid: function(status, headers, payload) {
    return status === 400 && !Ember.isNone(payload.Errors);
  },

  _normalizeErrors(payload) {
    const errors = [];
    const makeError = this._jsonApiError;
    Object.keys(payload.Errors).forEach(function(key) {
      payload.Errors[key].forEach(function(detail) {
        errors.push(makeError(key, detail));
      });
    });

    return errors;
  },

  _jsonApiError(key, detail) {
    return {
      detail: detail,
      source: {
        pointer: `data/attributes/${key.camelize()}`,
      },
    };
  },

  handleResponse: function(status, headers, payload) {
    if (this.isInvalid(status, headers, payload)) {
      const errors = this._normalizeErrors(payload);
      return new DS.InvalidError(errors);
    }

    return this._super(...arguments);
  },
});
