/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var net = require('net');

var server = net.createServer();
var clients = [];

server.on('connection', function(socket){
   console.log("got a new connection");
   socket.id = parseInt(Math.random()*1000, 10);
   clients.push(socket);
   socket.on('data', function(data){
       console.log('got data:', data.toString());
       socket.setEncoding('utf8');

       clients.forEach(function(otherSocket){
          if(otherSocket !== socket) {
              otherSocket.write(data);
          }
       });
   })

});

server.on('error', function(err){
   console.log('Server error: ', err.message);
});

server.on('close', function(){
    console.log('Server closed');
    var index = clients.indexOf(socket);
    clients.splice(index, 1);
});

server.listen(4001);
