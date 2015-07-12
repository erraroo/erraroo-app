import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  version: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  project: DS.belongsTo('project'),
});
