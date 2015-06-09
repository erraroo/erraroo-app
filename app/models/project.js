import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  token: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  unresolvedCount: DS.attr('number'),
});
