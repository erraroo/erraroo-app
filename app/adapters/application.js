import Ember from 'ember';
import GoRESTAdapter from 'go-rest-adapter/adapter';
import config from 'erraroo/config/environment';

const { service } = Ember.inject;

export default GoRESTAdapter.extend({
  host: config.apiHost,
  namespace: 'api/v1',
  session: service('session'),

  ajaxOptions() {
    let hash = this._super(...arguments);
    hash.crossDomain = true;

    let { beforeSend } = hash;
    hash.beforeSend = (xhr) => {
      this.get('session').authorize('authorizer:application', (headerName, headerValue) => {
        xhr.setRequestHeader(headerName, headerValue);
      });

      if (beforeSend) {
        beforeSend(xhr);
      }
    };

    return hash;
  },

  handleResponse: function(status) {
    if (status === 401) {
      this.get('session').invalidate();
      return true;
    }

    return this._super(...arguments);
  },
});
