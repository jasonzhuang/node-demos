/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var net = require('net');
var port = 4001;
var client;

process.stdin.resume();

(function connect(){
   client = net.createConnection(port);
   client.setEncoding('utf8');

   client.on('connect', function(){
       console.log("connected to server");
   });

   client.on('error', function(err){
       console.log('Error in connection:', err);
   });

   client.on('close', function(){
       console.log('connection got closed, will try to reconnect');
   });

   client.pipe(process.stdout, {end:false});

   process.stdin.pipe(client);
}());

