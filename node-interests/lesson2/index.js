/**
 * Created by yougen.zhuangyg on 2014/7/11.
 */
var PORT = 8080;
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var mime = require("mime");
var zlib = require("zlib");
var ROOT = "assets";

var server = http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    var realpath = path.join("assets",pathname);
    var mime = require("mime");
    pathHandle(pathname, realpath, req, res);
});

function pathHandle(pathname, realpath, req, res){
    fs.stat(realpath, function(err, stats){
       if(err){
           res.writeHead(404, {'Content-Type': 'text/plain'});
           res.write("This request URL " + pathname + " was not found on this server.");
           res.end();
       }else {
           var type = mime.lookup(pathname);
           var lastModified = stats.mtime.toUTCString();
           var ifModifiedSince = "If-Modified-Since".toLowerCase();
           res.setHeader("Server", "Tengine");
           res.setHeader("Last-Modified", lastModified);

           if(req.headers[ifModifiedSince] && lastModified === req.headers[ifModifiedSince] && (1 == 2)){
               res.writeHead(304, 'Not Modified');
               res.end();
           }else {
               var raw = fs.createReadStream(realpath);
               var acceptEncoding = req.headers['accept-encoding'];
               if (acceptEncoding.match(/\bgzip\b/)) {
                   res.writeHead(200, "Deflate OK",{ 'content-encoding': 'gzip' });
                   raw.pipe(zlib.createDeflate()).pipe(res);
               } else if (acceptEncoding.match(/\bdeflate\b/)) {
                   res.writeHead(200, "gzip OK",{ 'content-encoding': 'deflate' });
                   raw.pipe(zlib.createGzip()).pipe(res);
               } else {
                   res.writeHead(200, "OK", {});
                   raw.pipe(res);
               }
              /* res.writeHead(200, "OK", {});
               raw.pipe(res);*/
           }
       }
    });
}

server.listen(PORT || 8080);