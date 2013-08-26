var fs = require('fs'),
    http = require('http'),
    sio = require('socket.io');

var server = http.createServer(function(req, res){
   res.writeHead(200, {'Content-Type':'text/html'});
   res.end(fs.readFileSync('./index.html')); 
});

server.listen(8888, function(){
    console.log('Server listening at http://localhost:8888/');
});

//Attch the socket.io server
io = sio.listen(server);
//store messages
var messages = [];
//define a message handler
io.sockets.on('connection', function(socket){
   socket.on('message', function(msg){
       console.log('Received: ', msg);
       messages.push(msg);
       socket.broadcast.emit('message', msg);
   });
   //send messages to new clients
   messages.forEach(function(msg){
      socket.send(msg); 
   });
});
