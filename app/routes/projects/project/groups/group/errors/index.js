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
});
