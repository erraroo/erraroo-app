import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  checksum: DS.attr('string'),
  project: DS.belongsTo('project'),
  payload: DS.attr('string'),
  createdAt: DS.attr('date'),
  payloadUrl: DS.attr('string'),
  json: function() {
    const PromistObject = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);
    const promise = Ember.$.getJSON(this.get('payloadUrl'));
    return PromistObject.create({promise: promise});
  }.property('payloadUrl'),
});
