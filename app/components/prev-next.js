import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['prev-next'],

  page: Ember.computed.oneWay('pagination.page'),
  pages: Ember.computed.oneWay('pagination.pages'),

  hasNext: Ember.computed('page', 'pages', function() {
    const page = this.get('page');
    const pages = this.get('pages');
    return page < pages;
  }),

  hasPrev: Ember.computed('page', function() {
    const page = this.get('page');
    return page  > 1;
  }),

  actions: {
    prev() {
      this.sendAction('prev');
    },

    next() {
      this.sendAction('next');
    }
  }
});
