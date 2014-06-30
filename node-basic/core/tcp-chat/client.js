/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var net = require('net');
var port = 6969;
var host = "10.17.198.51";
var client;
var quitting = false;

/*process.stdin.resume();

process.stdin.on('data', function(data){
   if(data.toString().trim().toLowerCase() === 'quit'){
      quitting = true;
      console.log("quitting...");
      client.end();
      process.stdin.pause();
   }else {
       client.write(data);
   }
});*/

(function connect(){
   client = net.createConnection(port, host);
   client.setEncoding('utf8');

   client.on('connect', function(){
       console.log("connected to server");
   });

   client.on("data", function(data){
       console.log("response from server: ");
       console.log(data);
   });

   client.on('error', function(err){
       console.log('Error in connection:', err);
   });

   client.on('close', function(){
       console.log('connection got closed, will try to reconnect');
   });

   //client.pipe(process.stdout, {end:false});
   //process.stdin.pipe(client);
   var cmd = new Buffer(1);
   cmd.writeInt8(1,0);
   var id = new Buffer(4);
   id.writeInt32BE(28573,0);
   var name="庄有根";
   var length = Buffer.byteLength(name,'utf8');
   var nameLen = new Buffer(4);
   nameLen.writeInt32BE(length,0);

   var nname = new Buffer(length);
   nname.write(name,'utf8');

    var pid = new Buffer(1);
    pid.writeInt8(2,0);

    var result = Buffer.concat([cmd, id, nameLen, nname, pid]);
    console.log(result);
    client.write(result);
}());

