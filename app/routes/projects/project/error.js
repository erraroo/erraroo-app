import Authenticated from 'erraroo/routes/authenticated';

export default Authenticated.extend({
  afterModel: function(model) {
    model.set('seen', true);
  },
});
