var fs = require('fs');

(function execute(){
    //readFile();
    //writeFile();
    //streamFile();
    // findFile('/tmp', 'test.txt', function(err, path){
        // if(err) {throw err;}
        // console.log('Found file at: ' + path);
    // });    //utilities();
    bb();
})();

//read from 10-14
function bb(){
    fs.open("./result.txt", 'r+', function(err, fd){
        if(err) throw err;
            
        console.log("fd is: ", fd);
        var buffer = new Buffer(5),
            readBytes = 0;
        (function readIt(){
           fs.read(fd, buffer, readBytes, buffer.length - readBytes, 10+readBytes, function(err, bytesRead){
              if(err) throw err;
              readBytes += bytesRead;
              if(readBytes === buffer.length){
                  console.log(buffer);
              }else {
                  readIt();
              }
           });
        })();
    })
}

function utilities(){
    fs.stat("./result.txt", function(err, stats){
       if(err) console.log(err.message);
       console.log(stats);
       //console.log("file size is ", stats.size, " bytes"); 
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

function streamFile(){
    var input = fs.createReadStream('./result.txt', {flags:'r'});
    var out = fs.createWriteStream('./result2.txt', {flags:'w'});
    input.pipe(out);
}

function writeFile(){
    fs.open('./result.txt', 'a', function(err, fd){
       var writeBuffer = new Buffer("I'm Writing into file"),
           bufferOffset = 0,
           bufferLength = writeBuffer.length,
           filePosition = null;
       fs.write(fd, writeBuffer, bufferOffset, bufferLength, filePosition, function(err, written){
          if(err) throw err;
          console.log("write ", written, " bytes"); 
       });
    });
}

function readFile(){
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

