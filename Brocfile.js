/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var vendor = 'bower_components';

var app = new EmberAddon();

if (app.env === 'development' || app.env === 'test') {
  app.import(vendor + '/sinonjs/sinon.js');
}

module.exports = app.toTree();
