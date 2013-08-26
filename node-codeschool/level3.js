/**
 * pipe automatically closed our process.stdout WritableStream
 * so we should add paramter "end:false" 
 */

var fs = require('fs');
var file = fs.createReadStream('index.html');

file.pipe(process.stdout, { end: false });
console.log('--File Complete--');


/**
 *
 * following is same as file.pipe(newFile);
 */
var fs = require('fs');
var file = fs.createReadStream("icon.png");
var newFile = fs.createWriteStream("icon-new.png");

file.on('data', function(chunk) {
  var buffer_good = newFile.write(chunk); // return false if kernal buffer is full
  if(!buffer_good) {
    file.pause();
  }
});

newFile.on('drain', function(){
    file.resume();
});

file.on('end', function() {
  newFile.end();
});

/**
 *
 * download file 
 */
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'image/png'});
  var file = fs.createReadStream('icon.png');
  file.pipe(response);
});