import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  model: function() {
    return this.modelFor('projects.project').get('revisions');
  },
});
