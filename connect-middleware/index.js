/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var connect = require('connect');
var format = require('util').format;
// import middlewares
var logRequest = require('./log_request');
var writeHeader = require('./enhanceHeader');

var app = connect();

//app.use(connect.static(__dirname + '/public'));

//use custom middleware
/*
 app.use(function(req, res, next){
   console.log("In comes a " + req.method + " to " + req.url);
   next();
 })
app.use(logRequest(__dirname + '/logs'));
app.use(writeHeader('X-powered-By', 'Node'));
app.use(connect.static(__dirname + '.public'));
*/


//parse body  curl -X POST -F a=b; curl -X POST --data-urlencode a=b
/*app.use(connect.logger(':method :req[content-type]'));
app.use(connect.bodyParser());
app.use(function(req, res){
    res.end(JSON.stringify(req.body));
})*/

//parse cookies  curl -b 'a=b;c=d' http://localhost:8080
/*app.use(connect.cookieParser('this is secret string'));
app.use(function(req, res){
    res.end(JSON.stringify(req.cookies));
})*/

//use query
// http://localhost:8080/?hello=node
/*app.use(connect.query());
app.use(function(req, res){
    res.end(JSON.stringify(req.query));
});*/

//use session
/*app.use(connect.query());
app.use(connect.cookieParser('this is my secret string'));
app.use(connect.session({
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
// actually respond
app.use(function(req, res) {
    for (var name in req.query) {
        req.session[name] = req.query[name];
    }
    res.end(format(req.session) + '\n');
});

app.use(function(req, res){
   res.end(JSON.stringify(req.query));
});*/

app.listen(8080);
