import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  model: function(params) {
    const query = params;
    query.limit = 1;
    query.page = params.offset;
    query.project_id = this.mf('project').get('id');
    query.checksum = this.mf('error').get('checksum');
    return this.store.query('event', query).then(function(results) {
      const event = results.get('firstObject');
      const meta  = results.get('meta');
      event.set('meta', meta);
      return event;
    });
  },

  projectPath: 'projects.project',
  errorPath:   'projects.project.error',
  mf: function(path) {
    return this.modelFor(this.get(path + 'Path'));
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('error', this.mf('error'));
  }
});
