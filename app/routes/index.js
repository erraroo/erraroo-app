import Authenticated from './authenticated';

export default Authenticated.extend({
  afterModel: function() {
    this.transitionTo('projects');
  }
});
