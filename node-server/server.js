var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        //console.log("request url: ", request.url);//e.g:url: /upload?index=1
        var pathname = url.parse(request.url).pathname; //pathname: /upload
        console.log("Request for " + pathname + " received");
        route(handle, pathname, response, request);
    }
    http.createServer(onRequest).listen(8888);
    console.log("server started");
}

exports.start = start;

