import LocalStorage from 'ember-simple-auth/stores/local-storage';

export default LocalStorage.extend({
  _didInit: function() {
    console.log('application loca storea');
  }.on('init'),
});
