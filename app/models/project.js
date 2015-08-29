import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  token: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  unresolvedCount: DS.attr('number'),

  libraries: DS.hasMany('library', { async: true }),

  regenerateToken() {
    const name = this.constructor.modelName;
    const store = this.store;
    const adapter = store.adapterFor(name);
    const url = adapter.buildURL(name, this.id, this);
    const options = Ember.merge(adapter.ajaxOptions(), {
      url: url + '/regenerate-token'
    });

    return Ember.$.ajax(options).then(function(project) {
      Ember.run(store, 'pushPayload', project);
    });
  }
});
