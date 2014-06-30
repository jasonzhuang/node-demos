exports.index = function(req, res, next){
    res.render('list.ejs', {activities: req.db.activities.getAll(), title: "join Activity"});
}

exports.join = function(req, res, next){
    console.info("join by user");
    res.send(200);
}
/*router
    .get('/all', function(req, res, next) {
        //console.info(app); //undefined
        var data = global.app.locals.storage.getAll();
        res.render("list.ejs",{activities: data});
        next();

    })
    .post("/post/:slug", function(req, res){
        console.info(req.params.slug);
        var customer = req.customer || {};
        customer.name = "jason";
        customer.activity = req.param.slug;
        res.send("参加成功");
        next();
    })
;*/
