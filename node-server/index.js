/**
 * module:
 * A module prefixed with '/' is an absolute path to the file
 * A module prefixed with './' is relative to the file calling require()
 * Without a leading '/' or './' to indicate a file, the module is either a "core module" or is loaded from a node_modules folder. 
 * module.exports is the same as the exports object
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandler");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/download"] = requestHandlers.download;


server.start(router.route, handle);
