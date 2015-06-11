/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pick = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var app = new EmberApp({
  fingerprint: {
    prepend: 'https://d16vxe267myqks.cloudfront.net/'
  },

  sourcemaps: {
    enabled: true,
  },
});

app.import('bower_components/moment/moment.js');
//app.import('bower_components/fastclick/lib/fastclick.js');
app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js');
app.import('bower_components/d3/d3.js');
app.import('bower_components/c3/c3.js');
app.import('bower_components/c3/c3.css');

var bootstrapFonts = pick('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
  srcDir: '/',
  destDir: '/assets/boostrap'
});

module.exports = mergeTrees([
  app.toTree(),
  bootstrapFonts,
]);

