var cp = require('child_process');
var n = cp.fork('child.js');

console.log("in parent.js, parent pid: ", process.pid);
console.log("in parent.js, child pid: ", n.pid);

n.on('message', function(message){
   console.log("parent got message: ", message);
})

console.log("argv[0]: ", process.argv[0]);

n.send({hello:'world'});