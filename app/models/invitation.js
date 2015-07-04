import DS from 'ember-data';

export default DS.Model.extend({
  address: DS.attr('string'),
  accepted: DS.attr('boolean'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user', {async: true}),
});

