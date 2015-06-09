import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('project'),
  createdAt: DS.attr('date'),
  payload: DS.attr('string'),

  timingData: function() {
   const data = JSON.parse(this.get('payload'));
   data.createdAt = this.get('createdAt');

   if (data.firstPaintTime < 0) {
     data.firstPaintTime = 0;
   }

   return data;
  }.property('payload'),
});
