import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  model: function(params) {
    return this.modelFor('projects.project').get('libraries');
  },
});
