import Authenticated from '../authenticated';

export default Authenticated.extend({
  beforeModel: function() {
    const router = this;
    return this.store.findAll('project').then(function(projects) {
      const project = projects.get('firstObject');
      if (projects.get('length') === 0) {
        router.transitionTo('projects.new');
      } else {
        router.transitionTo('projects.project.errors', project);
      }
    });
  },
});
