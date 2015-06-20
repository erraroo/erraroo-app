import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  model: function() {
    return this.modelFor('projects.project.errors.error.events');
  },

  afterModel: function(models /*, transition*/) {
    const lastError = models.get('firstObject');
    this.transitionTo(this.transitionPath(), lastError);
  },

  transitionPath: function() {
    let path = this.controllerFor('application').get('currentPath');
    if (!this.isStickyPath(path)) {
      path = 'projects.project.errors.error.events.event';
    }

    return path;
  },

  isStickyPath: function(path) {
    return path === 'projects.project.errors.error.events.event.stack';
  }
});
