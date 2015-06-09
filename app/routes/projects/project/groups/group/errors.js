import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  projectPath: 'projects.project',
  groupPath: 'projects.project.groups.group',
  errorPath: 'projects.project.groups.group.errors.error',

  model: function(params) {
    const errorsQuery = params;
    errorsQuery.group_id = this.mf('group').get('id');
    errorsQuery.page = params.page;
    errorsQuery.project_id = this.mf('project').get('id');
    return this.store.findQuery('error', errorsQuery);
  },

  mf: function(path) {
    return this.modelFor(this.get(path + 'Path'));
  },

  actions: {
    nextError: function() {
      const errors = this.currentModel;
      const currentError = this.mf('error');
      const index = errors.indexOf(currentError);
      const pagination = errors.get('meta.pagination');
      if (index + 1 < errors.get('length')) {
        const next = errors.objectAt(index + 1);
        this.transitionTo(this.get('errorPath'), next);
      } else if (pagination.page + 1 <= pagination.pages) {
        this.transitionTo(this.get('groupPath'), {
          queryParams: { page: pagination.page + 1}});
      }
    },

    prevError: function() {
      const errors = this.currentModel;
      const currentError = this.modelFor(this.get('errorPath'));
      const pagination = errors.get('meta.pagination');
      const index = errors.indexOf(currentError);
      if (index - 1 >= 0) {
        const prev = errors.objectAt(index - 1);
        this.transitionTo(this.get('errorPath'), prev);
      } else if (pagination.page - 1 > 0) {
        this.transitionTo(this.get('groupPath'), {
          queryParams: { page: pagination.page - 1, last: true}});
      }
    },
  }
});
