(function execute(){
    //header();
    //claw();
    //serveFile();
    //saveBody();
})();

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

/**
 * localhost:4000/travel/list.txt
 * req.url: /travel/list.txt
 */
function header(){
    var util = require("util");
    require("http").createServer(function(req, res){
       res.writeHead(200, {'Content-Type':'text/plain'});
       res.write("http method: " + req.method + '\n');
       res.write("http url: "+ req.url + '\n');
       res.end(util.inspect(req.headers)); 
    }).listen(4000);
};

function proxy(){
    var http = require('http');
    var url = require('url');
    http.createServer(function(sreq, sres) {
        var url_parts = url.parse(sreq.url);
        var options = {
            host: 'google.com',
            port: 80,
            path: url_parts.pathname,
            method: sreq.method,
            headers: sreq.headers
        };
        var creq = http.request(opts, function(cres) {
            sres.writeHead(cres.statusCode, cres.headers);  
            cres.pipe(sres);
        });
        sreq.pipe(creq);    
    }).listen(80);
    console.log("Server running");
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