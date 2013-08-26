var socket = require('socket.io');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = socket.listen(server);

var questions = [];
var storeMessage = function(data){
    questions.push({question:data});
}

io.sockets.on('connection', function(client){
    console.log('Client connected...');
    
    client.on('answer', function(question, answer) {
        client.broadcast.emit('answer', question, answer);
    });

    client.on('question', function(question) {
        client.get('question_asked', function(asked) {
            if(!asked) {
                client.set('question_asked', true);
                client.broadcast.emit('question', question);
                storeMessage(question);
            }
        });
    });
});
    
