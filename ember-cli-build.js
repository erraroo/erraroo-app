/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      prepend: 'https://d1bbicx3ding66.cloudfront.net/'
    },

    sourcemaps: {
      enabled: true,
    },

     'ember-cli-bootstrap-sassy': {
       'glyphicons': true,
       'js': ['dropdown', 'collapse'],
     }
  });

  app.import('bower_components/moment/moment.js');
  //app.import('bower_components/fastclick/lib/fastclick.js');
  app.import('bower_components/d3/d3.js');
  app.import('bower_components/c3/c3.js');
  app.import('bower_components/c3/c3.css');

  return app.toTree();
};
