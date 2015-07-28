import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('project', { async: false }),
  error: DS.belongsTo('error', { async: false }),
  key: DS.attr('string'),
  value: DS.attr('string'),
  occurrences: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
});
