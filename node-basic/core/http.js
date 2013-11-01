(function execute(){
    //postData()
    //pipeFile()
    //serveFile();
    //saveBody();
    proxy();
})();

function proxy(){
   var http = require("http");

   http.createServer(function(req, res){
      if(req.url == '/fun'){
         var req = http.get({host:'www.google.com.hk'}, function(res2){
             console.log("got response: " + res2.statusCode);
             //res2 is ReadableStream
             res2.setEncoding('utf8');
             var body = '';
             res2.on('data', function(chunk){
                 console.log(chunk);
                 body += chunk;
             });
             res2.on('end', function(){
                res.end(body, 'utf8');
             });
             res2.on('error', function(err){
                console.log("got error");
                res.writeHead(404,"can't redirect");
                res.end("redirect error");
             });
         })
      } else {
          res.end("hello");
      }
   }).listen(4000)
}

/**
 * curl -F username='yougen' -F vip=true http://localhost:4000/
 */
function postData() {
    console.log("play...");
    var qs = require('querystring');
    var util = require('util');
    require('http').createServer(function(req, res) {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
                console.log(body);
            });
            req.on('end', function () {
                console.log("request data complete");
                var POST = qs.parse(body);
                //do stuff
            });
            res.end("post request");
        } else {
            res.end("get request");
        }

    }).listen(4000);
}

function pipeFile(){
    var http = require("http");
    http.createServer(function(req, res) {
       var fs = require('fs');
       var readable = fs.createReadStream('subway.jpg');
       res.writeHead(200, {'content-Type':'image/jpg'});
       readable.pipe(res);
    }).listen(4000);
}

function serveFile(){
    var http = require("http");
    var fs = require("fs");
    var path = require("path");
    http.createServer(function(req, res){
        var file = path.normalize(req.url);
        console.log("request file: ", file);
        fs.exists(file, function(exists){
          if(exists){
              fs.stat(file, function(err, stat){
                 var rs;
                 if(err) throw err;
                 if(stat.isDirectory()){
                     res.writeHead(403);
                     res.end('Forbidden');
                 }else {
                   rs = fs.createReadStream(file);
                   res.writeHead(200);
                   rs.pipe(res);//incoming data on rs gets written to res
                 }
              });
          }else {
              res.writeHead(404);
              res.end('Not found');
          }  
        })
    }).listen(4000);
}

function saveBody(){
    var http = require('http');
    var fs = require("fs");
    var sequence = 0;
    http.createServer(function(req, res){
        var fileName = "/cloud/log" + sequence + ".txt";
        console.log("writing " + fileName);
        var writeStream = fs.createWriteStream(fileName);
        req.pipe(writeStream);//pipe the request data into writeStream
        req.on('end', function(){
            res.writeHead(200);
            res.end();
        });
        sequence++;
    }).listen(4000);
}