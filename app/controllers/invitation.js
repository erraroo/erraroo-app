import Signup from './signup';

export default Signup.extend({
  signupRequestData: function() {
    const data = this._super();
    data.Signup.Token = this.get('model.id');
    return data;
  },
});
