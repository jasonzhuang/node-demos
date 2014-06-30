/**
 * Created by yougen.zhuangyg on 2014/6/27.
 */
exports.index = function(req, res, next){
    res.render("admin/index", req.db.activities);
};

exports.add = function(req, res, next){
    if (!req.body || !req.body.name) return next(new Error('No data provided.'));
    req.db.add({
       name: req.body.name
    });
    console.info('Added %s',req.body.name);
    res.redirect("/admin/index");
};

exports.delete = function(req, res, next){
    req.db.deleteById(req.slug);
    res.redirect("/admin/index");
};