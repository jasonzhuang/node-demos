/**
 * Created by yougen.zhuangyg on 2014/6/13.
 */
var net = require('net');
var port = 6969;
var host = "10.17.198.51";

function connection(){
    var socket = net.createConnection(port, host);
    console.log('Socket created.');
    socket.on('data', function(data) {
        // Log the response from the HTTP server.
        console.log('RESPONSE: ' + data);
    }).on('connect', function() {
        // Manually write an HTTP request.
        //socket.write("GET / HTTP/1.0\r\n\r\n");
    }).on('end', function() {
        console.log('DONE');
    });

}

connection()