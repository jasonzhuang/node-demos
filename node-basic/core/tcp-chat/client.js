/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var net = require('net');
var port = 4001;
var client;
var quitting = false;

process.stdin.resume();

process.stdin.on('data', function(data){
   if(data.toString().trim().toLowerCase() === 'quit'){
      quitting = true;
      console.log("quitting...");
      client.end();
      process.stdin.pause();
   }else {
       client.write(data);
   }
});

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

