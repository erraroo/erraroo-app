import Ember from 'ember';

export default Ember.Component.extend({

  string: Ember.computed('userdata', function() {
    return JSON.stringify(this.get('userdata'), null, 2);
  })
});
