import Authenticated from '../authenticated';

export default Authenticated.extend({
  projectsExcludingNew() {
    return this.store.peekAll('project').filterBy('isNew', false);
  },

  beforeModel: function() {
    const projects = this.projectsExcludingNew();
    const project = projects.get('firstObject');

    if (projects.get('length') === 0) {
      this.transitionTo('projects.new');
    } else {
      this.transitionTo('projects.project.errors', project);
    }
  },
});
