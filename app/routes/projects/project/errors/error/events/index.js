import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  projectPath: 'projects.project',
  groupPath: 'projects.project.groups.group',
  errorPath: 'projects.project.groups.group.errors.error',

  model: function() {
    return this.modelFor('projects.project.errors.error.events');
  },

  mf: function(path) {
    return this.modelFor(this.get(path + 'Path'));
  },
});
