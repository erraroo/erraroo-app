import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('project', { async: false }),
  githubOrg: DS.attr('string'),
  githubRepo: DS.attr('string')
});
