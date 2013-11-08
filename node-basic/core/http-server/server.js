/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var http = require("http");

http.createServer(function(req, res){
   function printBack(){
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.end(JSON.stringify({
           url: req.url,
           method: req.method,
           headers: req.headers
       }));
   }

   switch(req.url){
       case '/redirect':
          res.writeHead(301, {"Location": '/'});
          res.end();
          break;

       case '/print/body':
           req.setEncoding('utf8');
           req.pipe(res);
           req.end();
           break;
       default:
           printBack();
           break;
   }
}).listen(4001);