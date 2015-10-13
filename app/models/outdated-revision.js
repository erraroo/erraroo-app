import DS from 'ember-data';

export default DS.Model.extend({
  sha: DS.attr('string'),
  project: DS.belongsTo('project', { async: false }),
  dependencies: DS.attr('array'),
});

