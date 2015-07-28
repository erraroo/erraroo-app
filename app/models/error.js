import DS from 'ember-data';

export default DS.Model.extend({
  checksum: DS.attr('string'),
  name: DS.attr('string'),
  message: DS.attr('string'),
  project: DS.belongsTo('project', { async: false }),
  resolved: DS.attr('boolean'),
  occurrences: DS.attr('number'),
  lastSeenAt: DS.attr('date'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  muted: DS.attr('boolean'),
  isJustUpdated: false,

  flagAsNew: function() {
    if (!this.get('resolved')) {
      this.set('isJustUpdated', true);
    }
  },

  resolve: function() {
    if (!this.get('resolved')) {
      this.setProperties({
        resolved: true,
        isJustUpdated: false,
      });

      this.save();
    }
  }
});
