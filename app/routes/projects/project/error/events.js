import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  beforeModel: function(t) {
    if (t.targetName === 'projects.project.error.events.event.index' ||
        t.targetName === 'projects.project.error.events.event.logs') {
      return;
    }

    this.transitionTo('projects.project.error.events.event', 1);
  },
});
