/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
/**
 * use express to support jsonp
 */
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/endpoint', function(req, res){
    var obj = {};
    obj.title = "title";
    obj.data = "from node";

    console.log('params: ' + JSON.stringify(req.params));
    console.log('body: ' + JSON.stringify(req.body));
    console.log('query: ' + JSON.stringify(req.query));

    res.header('Content-type','application/json');
    res.header('Charset','utf8');
    res.send(req.query.callback + '('+ JSON.stringify(obj) + ');');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

