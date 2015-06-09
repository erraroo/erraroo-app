import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  beforeModel: function() {
    return this.transitionTo('projects.project.groups');
  },
});
