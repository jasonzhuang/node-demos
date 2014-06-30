var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var router = express.Router();
// GET /static/test.txt
app.use('/static', express.static(__dirname + '/public'));
// GET test.txt
app.use(express.static(__dirname + '/files'));
app.use(router);
//app.locals({
    //title: 'Extended Express Example'
//});

app.all('*', function(req, res, next){
    fs.readFile('posts.json', function(err, data){
        res.locals.posts = JSON.parse(data);
        next();
    });
});

app.get('/funReq',function(req, res){
    console.info(req.cookies);
});

app.get('/funRes', function(req, res){
    /*res.cookie('username',"json",{domain:'.example.com',path:"/admin"});
    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.location('foo/bar');*/
   //res.send([1,2,3]);
   //res.send(500);
   //res.json({ user: 'tobi' });
    var dir = path.join(__dirname,"/subway.jpg");
    //res.attachment(dir);
    /*res.links({
        next: 'http://api.example.com/users?page=2',
        last: 'http://api.example.com/users?page=5'
    });*/
    res.download(dir);
    res.send("hello");
});

app.get('/post/:slug', function(req, res, next){
    res.locals.posts.forEach(function(post){
        if (req.params.slug === post.slug){
            res.render('post.ejs', { post: post });
        }
    });
});

app.get('/api/posts', function(req, res){
    res.json(res.locals.posts);
});

app.listen(3000);
console.log('app is listening at localhost:3000');