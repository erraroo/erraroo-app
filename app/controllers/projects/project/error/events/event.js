import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Controller.extend({
  page: computed.oneWay('model.meta.pagination.page'),

  needs: ['application'],
  currentPath: computed.oneWay('controllers.application.currentPath'),

  newestEvent: computed('page', function() {
    return 1;
  }),

  newerEvent: computed('page', function() {
    return this.get('page') - 1;
  }),

  canNotNewerEvent: computed('page', function() {
    return this.get('page') <= 1;
  }),

  olderEvent: computed('page', function() {
    return this.get('page') + 1;
  }),

  canNotOlderEvent: computed('page', function() {
    const total = this.get('oldestEvent');
    return this.get('page') + 1 > total;
  }),

  oldestEvent: computed('page', function() {
    return this.get('model.meta.pagination.total');
  }),
});
