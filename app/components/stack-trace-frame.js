import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['frame'],
  isExpanded: false,

  file: function() {
    const frame = this.get('frame');
    const file = frame.origFile;

    if (Ember.isEmpty(file)) {
      return frame.url;
    }

    return file;
  }.property('frame'),

  lines: function() {
    const isExpanded = this.get('isExpanded');
    const frame = this.get('frame');
    const lines = [];

    if (Ember.isNone(frame)) {
      return lines;
    }

    if (isExpanded) {
      frame.preContext.forEach(function(l) {
        lines.pushObject({
          css: 'context',
          line: l,
        });
      });
    }

    lines.pushObject({
      css: 'highlight',
      line: frame.contextLine,
    });

    if (isExpanded) {
      frame.postContext.forEach(function(l) {
        lines.pushObject({
          css: 'context',
          line: l,
        });
      });
    }

    return lines;
  }.property('isExpanded', 'frame'),

  actions: {
    toggleExpanded() {
      this.toggleProperty('isExpanded');
    }
  }
});
