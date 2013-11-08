var fs = require('fs');
var path = require("path");

(function execute(){
    //readbytesFile();
    //writebytes();
    //download();
    //echo();
    //writeFile();
    //readFile();
    renameFile(path.join(__dirname, "public"));
})();

//rename files under "public"
function renameFile(filepath){
   var SUFFIX = ".txt";
   fs.readdir(filepath, function(err, files){
       if(err){
           throw err;
       }

       files.forEach(function(file, index){
          var curfile = path.join(filepath, file);
          console.log("handle file: " + curfile);
          fs.stat(curfile, function(err, stats){
              if(stats.isFile() && path.extname(curfile) === SUFFIX){
                 var newName = index + ".txt";
                 fs.rename(curfile, path.join(filepath, newName));
              }
          })
       });
   });
}

function readFile(){
    var readable = fs.createReadStream("test.txt", {encoding:"utf8"});
    readable.pipe(process.stdout);
}

function writeFile() {
    var writable = fs.createWriteStream("test.txt", {flags:'w+', encoding:'utf8'});
    var content = ["Hello world", "Node is nice", "JS is greate"];
    content.forEach(function(data, index){
       writable.write(data);
       writable.write("\r\n");
   })
}

/**
 *  The stdin stream is paused by default, so one must call process.stdin.resume() to read from it
 */
function echo(){
    process.stdin.resume();// open the faucet
    process.stdin.on('data', function(chunk) {
        process.stdout.write('data: ' + chunk);
    });
}

function download(){
    var fs = require('fs');
    var http = require('http');

    http.createServer(function(request, response) {
        response.writeHead(200, {'Content-Type': 'image/png'});
        var file = fs.createReadStream('icon.png');
        file.pipe(response);
    });
}

function findFile(path, searchFile, callback){
    fs.readdir(path, function(err, files) {
       if(err) {
           return callback(err);
       }
       files.forEach(function(file){
          fs.stat(path + '/' + file, function(err, stats){
              if(err) {return callback(err);}
              if(stats.isFile() && file == searchFile){
                  callback(undefined, path+'/'+file);
              } else if(stats.isDirectory()){
                  findFile(path + '/' + file, searchFile, callback);
              }
          }) 
       });
    });
}

function writebytes(){
    fs.open('./result.txt', 'a', function(err, fd){
       var writeBuffer = new Buffer("\nI'm Writing into file"),
           bufferOffset = 0,
           bufferLength = writeBuffer.length,
           filePosition = null;
       fs.write(fd, writeBuffer, bufferOffset, bufferLength, filePosition, function(err, written){
          if(err) throw err;
          console.log("write ", written, " bytes"); 
       });
    });
}

function readbytes(){
    fs.open('./result.txt', 'r', function(err, fd){
        if(err) throw err;
        var buf = new Buffer(1024),
            bufOffset = 0,
            bufLength = buf.length,
            filePostion = 10;
        fs.read(fd, buf, bufOffset, bufLength, filePostion, function(err, readBytes, buffer){
            if(err) throw err;
            console.log(err, readBytes, buffer);
            fs.close(fd, function(){
               console.log('Done');
            });
        })
    })
}

