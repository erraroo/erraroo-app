import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  emailOnError: DS.attr('boolean'),

  emailOnErrorChanged: Ember.observer('emailOnError', function() {
    this.save();
  }),
});
