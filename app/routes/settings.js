import Authenticated from './authenticated';

export default Authenticated.extend({
  model() {
    return this.get('currentUser.user');
  }
});
