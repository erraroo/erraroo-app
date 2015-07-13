import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 1,

  newestPage: Ember.computed('page', function() {
    return 1;
  }),

  newerPage: Ember.computed('page', function() {
    return this.get('page') - 1;
  }),

  canNotNewerPage: Ember.computed('page', function() {
    return this.get('page') <= 1;
  }),

  olderPage: Ember.computed('page', function() {
    return this.get('page') + 1;
  }),

  canNotOlderPage: Ember.computed('page', function() {
    const total = this.get('model.meta.pagination.total');
    return this.get('page') + 1 > total;
  }),

  oldestPage: Ember.computed('page', function() {
    return this.get('model.meta.pagination.total');
  }),
});
