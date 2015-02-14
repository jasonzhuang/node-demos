var Deferred = require("./promise");
var fs = require("fs");
var readFile1 = function(file){
    var deferred = new Deferred();
    fs.readFile(file, "utf-8",deferred.callback());
    return deferred.promise;
};
var readFile2 = function(file){
    var deferred = new Deferred();
    fs.readFile(file,"utf-8",deferred.callback());
    return deferred.promise;
};

readFile1("./file1.txt").then(function(file1){
     return readFile2("./file2.txt");
}).then(function(file2){
    console.log(file2);
});