import Ember from 'ember';
import Base from './base';

const { get } = Ember;

export default Base.extend({
  content:Ember.computed('payload', function() {
    let message = '';
    const payload = this.get('payload');

    Object.keys(payload).forEach(function(key) {
      const value = get(payload, key);
      message += `<strong>${key}</strong>=${value} `;
    });

    return new Ember.Handlebars.SafeString(message);
  })
});
