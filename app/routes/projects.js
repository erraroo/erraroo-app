import Authenticated from './authenticated';
import Poller from 'erraroo/mixins/poller';

export default Authenticated.extend(Poller, {
  model: function() {
    return this.store.findAll('project');
  },

  activate: function() {
    //this.startPoll();
  },

  deactivate: function() {
    //this.stopPoll();
  },

  poll: function() {
    return this.store.query('project', {});
  },
});
