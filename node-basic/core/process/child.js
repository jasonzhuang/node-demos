/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
process.on('message', function(msg){
    console.log("child got message", msg);  // 'hello world'
});

console.log("in child.js, pid: ", process.pid);

process.send({foo:'bar'});
