/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var request = require("request");
var inspect = require('util').inspect;

var options = {
    url: 'http://localhost:4001/pring/body',
    form: {a:1,b:2}
}

request(options, function(err, res, body){
    if(err) throw err;
    console.log(inspect({
        err:err,
        res: {
            statusCode: res.statusCode,
            headers: res.headers
        },
        body: JSON.parse(body)
    }));
});