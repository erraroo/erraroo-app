import Ember from 'ember';
import DS from 'ember-data';
import config from 'erraroo/config/environment';

export default DS.Model.extend({
  checksum: DS.attr('string'),
  project: DS.belongsTo('project'),
  payload: DS.attr('string'),
  createdAt: DS.attr('date'),
  payload: DS.attr('string'),

  json: function() {
    return JSON.parse(this.get('payload'));
  }.property('payload'),
});
