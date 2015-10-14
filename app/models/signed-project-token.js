import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('project'),
  token: DS.attr('string'),
});
