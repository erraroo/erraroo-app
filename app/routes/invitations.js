import Authenticated from './authenticated';

export default Authenticated.extend({
  model: function() {
    return this.store.find('invitation');
  },
});
