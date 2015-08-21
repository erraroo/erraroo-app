import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  avatar: DS.attr('string'),
  email: DS.attr('string'),
  pref: DS.belongsTo('pref', { async: false }),
  account: DS.belongsTo('account', { async: false }),

  accountChannel: Ember.computed('account.id', function() {
    return `accounts.${this.get('account.id')}`;
  })
});
