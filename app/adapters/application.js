import Ember from 'ember';
import DS from 'ember-data';
import config from 'erraroo/config/environment';

const { service } = Ember.inject;

export default DS.RESTAdapter.extend({
  host: config.apiHost,
  namespace: 'api/v1',
  session: service('session'),

  shouldReloadAll() {
    //console.log('shouldReloadAll', arguments);
    return false;
  },

  shouldBackgroundReloadRecord() {
    //console.log('shouldBackgroundReloadRecord', arguments);
    return false;
  },

  ajaxOptions() {
    let hash = this._super(...arguments);
    hash.crossDomain = true;

    let { beforeSend } = hash;
    hash.beforeSend = (xhr) => {
      console.log("beforeSend");
      this.get('session').authorize('authorizer:application', (headerName, headerValue) => {
        console.log('called...', headerName, headerValue);
        xhr.setRequestHeader(headerName, headerValue);
      });

      if (beforeSend) {
        beforeSend(xhr);
      }
    };

    console.log(hash);
    return hash;
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
    if (status === 401) {
      this.get('session').invalidate();
      return true;
    }

    if (this.isInvalid(status, headers, payload)) {
      const errors = this._normalizeErrors(payload);
      return new DS.InvalidError(errors);
    }

    return this._super(...arguments);
  },
});
