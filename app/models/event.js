import DS from 'ember-data';

export default DS.Model.extend({
  checksum: DS.attr('string'),
  project: DS.belongsTo('project'),
  payload: DS.attr('string'),
  createdAt: DS.attr('date'),

  json: function() {
    return JSON.parse(this.get('payload'));
  }.property('payload'),
});
