/**
 * Created by yougen.zhuangyg on 2014/4/26.
 */
var PORT = 6060;
var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var mime = require("./mime").types;
var config = require("./config");
var zlib = require("zlib");

var server = http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname,
        realPath = path.join("assets", path.normalize(pathname.replace("/../g",'')));

    var pathHandle = function(realPath){
        fs.stat(realPath, function(err, stats){
            if(err){
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            }else {
                if(stats.isDirectory()){
                    realPath = path.join(realPath, "/", config.Welcome.file);
                    pathHandle(realPath);
                }else {
                    var ext = path.extname(pathname);
                    ext = ext ? ext.slice(1) : "";
                    var contentType = mime[ext] || "text/plain";
                    response.setHeader("Content-Type",contentType);
                    var lastModified = stats.mtime.toUTCString();
                    var ifModifiedSince = "If-Modified-Since".toLowerCase();
                    response.setHeader("Last-Modified", lastModified);

                    if(ext.match(config.Expires.fileMatch)){
                        var expires = new Date();
                        expires.setTime(expires.getTime() + config.Expires.maxAge + 1000);
                        response.setHeader("Expires", expires.toUTCString());
                        response.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
                    }

                    if(request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
                        response.writeHead(304, "Not Modified");
                        response.end();
                    }else {
                        var raw = fs.createReadStream(realPath);
                        var acceptEncoding = request.headers['accept-encoding'] || "";
                        var matched = ext.match(config.Compress.match);

                        if(matched && acceptEncoding.match(/\bdeflate\b/)){
                            response.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});
                            raw.pipe(zlib.createDeflate()).pipe(response);
                        }else if(matched && acceptEncoding.match(/\bgzip\b/)){
                            response.writeHead(200, "OK", {"Content-Encoding": "gzip"});
                            raw.pipe(zlib.createGzip()).pipe(response);
                        }else {
                            response.writeHead(200, "OK");
                            raw.pipe(response);
                        }
                    }
                }
            }
        });
    };

    pathHandle(realPath);
});

server.listen(PORT);
console.log("sever listen on " + PORT);