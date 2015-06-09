import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  model: function(/*params*/) {
    return this.store.find('timing', {
      project_id: this.modelFor('projects.project').get('id'),
    });
  },
});
