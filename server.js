'use strict'

const path   = require('path');
const config = require('./config');

// you can turn off debug messages in config.js
const debugOut = ( config.debug ) ? console.log : (() => { });
const errorOut = ( config.debug ) ? console.error : (() => { });

// default state
// to reset - delete file "state"
var state = { };

(async function () {
  var controller = new (require(path.resolve( __dirname, './imports/Controller')))({
    config: config,
    debug: debugOut
  });
})();