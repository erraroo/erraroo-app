import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  token: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  unresolvedCount: DS.attr('number'),

  repository: DS.belongsTo('repository', { async: true }),

  regenerateToken() {
    const name = this.constructor.modelName;
    const store = this.store;
    const adapter = store.adapterFor(name);
    const url = adapter.buildURL(name, this.id, this);
    const options = Ember.merge(adapter.ajaxOptions(), {
      type: 'post',
      url: url + '/regenerate-token'
    });

    return Ember.$.ajax(options).then(function(payload) {
      Ember.run(store, 'pushPayload', payload);
    });
  }
});
