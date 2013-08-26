var http = require("http");
var url = require("url");

/**
function start(route, handle){
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        var postData = "";
        console.log("Request for " + pathname + " received");
        
        request.setEncoding("utf-8");
        
        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log("Receive POST data chunk '" + postDataChunk + "'");
        });
        
        request.addListener("end", function(){
            route(handle, pathname, response, postData);
        });
    }
    http.createServer(onRequest).listen(8888);
    console.log("server started");
}
**/
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

