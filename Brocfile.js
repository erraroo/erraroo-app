/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  fingerprint: {
    prepend: 'https://d16vxe267myqks.cloudfront.net/'
  },

  sourcemaps: {
    enabled: true,
  },

   'ember-cli-bootstrap-sassy': {
     'glyphicons': true,
     'js': ['dropdown'],
   }
});

app.import('bower_components/moment/moment.js');
//app.import('bower_components/fastclick/lib/fastclick.js');
app.import('bower_components/d3/d3.js');
app.import('bower_components/c3/c3.js');
app.import('bower_components/c3/c3.css');

module.exports = app.toTree();
