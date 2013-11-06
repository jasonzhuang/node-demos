/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var fs = require("fs"),
    path = require("path");

function savefile(dir){
    return function(data) {
        console.log("save data");
        var fileName = path.join(dir, Date.now().toString() + '_' +
            Math.floor(Math.random() * 100000) + '.html');
        var file = fs.createWriteStream(fileName);
        file.write(data);
    }
}

exports.savefile = savefile;