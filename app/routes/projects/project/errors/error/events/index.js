import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  projectPath: 'projects.project',
  groupPath: 'projects.project.groups.group',
  errorPath: 'projects.project.groups.group.errors.error',

  model: function(params) {
    //const errorsQuery = params;
    //errorsQuery.page = params.page;
    //errorsQuery.project_id = this.mf('project').get('id');
    //errorsQuery.checksum = this.mf('group').get('checksum');
    //return this.store.query('error', errorsQuery);
    return this.modelFor('projects.project.errors.error.events');
  },

  mf: function(path) {
    return this.modelFor(this.get(path + 'Path'));
  },
});
