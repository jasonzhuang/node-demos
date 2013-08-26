/**
 * logger.js
 */
var warn = function(message) {
  console.log("Warning: " + message);
};

var info = function(message) {
  console.log("Info: " + message);
};

var error = function(message) {
  console.log("Error: " + message);
};

exports.warn = warn;
exports.info = info;
exports.error = error;

/**
 * app.js
 */
var logger = require('./logger');
logger.info('This is info..');
logger.error('This is error...');
