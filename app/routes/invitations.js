import Authenticated from './authenticated';

export default Authenticated.extend({
  model: function() {
    return this.store.findAll('invitation');
  },

  actions: {
    deleteInvitation(i) {
      if (confirm('Are you sure you want to delete this invitation?')) {
        const that = this;
        i.destroyRecord().then(function() {
          that.get('flashMessages').success('The invitation has been deleted');
        });
      }
    }
  }
});
