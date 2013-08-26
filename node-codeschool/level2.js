var http = require('http');

var server = http.createServer();
server.on('request', function(request, response) {
  response.writeHead(200);
  response.write("Hello, this is dog");
  response.end();
});
server.on('close', function(request, response){
    console.log('Closing down the server...');
})
server.listen(8080);