import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  projectPath: 'projects.project',
  errorPath:   'projects.project.errors.error',
  eventPath:   'projects.project.errors.error.events.event',

  model: function(params) {
    const query = params;
    query.page = params.page;
    query.project_id = this.mf('project').get('id');
    query.checksum = this.mf('error').get('checksum');
    return this.store.query('event', query);
  },

  mf: function(path) {
    return this.modelFor(this.get(path + 'Path'));
  },

  actions: {
    nextEvent: function() {
      const errors = this.currentModel;
      const currentEvent = this.mf('event');
      const index = errors.indexOf(currentEvent);
      const pagination = errors.get('meta.pagination');
      if (index + 1 < errors.get('length')) {
        const next = errors.objectAt(index + 1);
        this.transitionTo(this.get('errorPath'), next);
      } else if (pagination.page + 1 <= pagination.pages) {
        this.transitionTo(this.get('groupPath'), {
          queryParams: { page: pagination.page + 1}});
      }
    },

    prevEvent: function() {
      const errors = this.currentModel;
      const currentEvent = this.mf('event');
      const pagination = errors.get('meta.pagination');
      const index = errors.indexOf(currentEvent);
      if (index - 1 >= 0) {
        const prev = errors.objectAt(index - 1);
        this.transitionTo(this.get('errorPath'), prev);
      } else if (pagination.page - 1 > 0) {
        this.transitionTo(this.get('errorPath'), {
          queryParams: { page: pagination.page - 1, last: true}});
      }
    },
  }
});
