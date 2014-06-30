var express = require('express');
var path = require('path');
var fs = require('fs');
var Storage = require("./data/storage").Storage;
var Activity = require("./data/model").Activity;

// express 4.x middlewares
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var router = require("./router");
var admin = require("./router/admin");

var app = global.app = express();
app.locals.pretty = false;
app.locals.apName = "join activity";
var storage = new Storage();

fs.readFile(path.join(__dirname, '/data/activities.json'), function(err, data){
    // data is Buffer type
    JSON.parse(data).forEach(function(activity){
        storage.add(new Activity(activity));
    });
});

// all environments
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(function(req, res, next){
    // store activities collection in every request
    req.db = {};
    req.db.activities = storage;
    next();
});

// pipeline
app
    .use(express.static(__dirname + '/public'))
    .use(bodyParser())
    .use(cookieParser('xman_cookie_1394853009'))
    .use(session())
    .use(methodOverride())
    .use(express.Router())

.use(function(err, req, res, next) {
    res.json(err);
    console.error("[%s][%s] Express handle exception: [%s]", new Date(), process.pid, err);
    console.error("uncaught", "ExpressHandleError", JSON.stringify(err) + " | " + req.url);
});

app.get("/", router.index);
app.post("/join", router.join);
app.get("/admin", admin.index);
app.post("/admin/add", admin.add);
app.post("/admin/delete", admin.delete);

app.listen(7001, function() {
    console.log("[%s] app start : %s", new Date(), 7001);
});