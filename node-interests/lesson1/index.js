/**
 * Created by yougen.zhuangyg on 2014/7/4.
 */
var fs = require("fs");
var path = require("path");
var crypto = require('crypto');
var http = require("http");

function readDir(start, callback) {
    // Use lstat to resolve symlink if we are passed a symlink
    fs.lstat(start, function(err, stat) {
        if(err) {
            return callback(err);
        }
        var found = {dirs: [], files: []},
            total = 0,
            processed = 0;
        function isDir(abspath) {
            fs.stat(abspath, function(err, stat) {
                if(stat.isDirectory()) {
                    found.dirs.push(abspath);
                    // If we found a directory, recurse!
                    readDir(abspath, function(err, data) {
                        found.dirs = found.dirs.concat(data.dirs);
                        found.files = found.files.concat(data.files);
                        if(++processed == total) {
                            callback(null, found);
                        }
                    });
                } else {
                    found.files.push(abspath);
                    if(++processed == total) {
                        callback(null, found);
                    }
                }
            });
        }
        // Read through all the files in this directory
        if(stat.isDirectory()) {
            fs.readdir(start, function (err, files) {
               //console.log(files);
                total = files.length;
                for(var x=0, l=files.length; x<l; x++) {
                    isDir(path.join(start, files[x]));
                }
            });
        } else {
            return callback(new Error("path: " + start + " is not a directory"));
        }
    });
}

readDir('atom', function(err, result){
    var list = result.files;
    console.log(list);
    var filenames = [];
    list.forEach(function(val){
        val = val.replace(/\\/g,"/");
        filenames.push(val);
    });
    //console.log(filenames);
    var source = filenames.join('');
    var hash = crypto.createHash('md5').update(source,'utf8').digest('hex');
    console.log(hash);
    /*var req = http.request({
       host: 'http://10.17.198.220//validate/1',
       port: 3000
    }, function(response){

    });*/
})


