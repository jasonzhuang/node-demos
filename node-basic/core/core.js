(function execute(){
    //emitter();
    //module();
    //schedule()
    fun();
})();

function fun(){
    var name = "jason";
    //console.log("sss");
    console.log(Buffer.byteLength(name,'utf-8'));
    /*var path = require("path");
    function parseURL(root, url) {
        var base, pathnames, parts;

        if (url.indexOf('??') === -1) {
            url = url.replace('/', '/??');
        }

        parts = url.split('??');
        base = parts[0];
        pathnames = parts[1].split(',').map(function (value) {
            return path.join(root, base, value);
        });

        console.log(pathnames);
    }

    parseURL(".", "http://assets.example.com/foo/??bar.js,baz.js")；*/
}

/**
 * module is singleton, cached, only initialize once.
 */
function module(){
    var sample = require("./sample");
    sample.fun();
    console.log(sample);
}


/**
 * this refers to the EventEmitter that the listener was attached to
 */
function emitter(){
    var EventEmitter = require('events').EventEmitter,
        util = require("util");
    /*var Ticker = function(){
        var self = this;
        setInterval(function(){
            self.emit("tick");
        }, 1000)
    };
    
    util.inherits(Ticker, EventEmitter);
    
    var ticker = new Ticker();
    ticker.on("tick", function(){
        console.log(this instanceof Ticker);//true
        console.log("tick...");
    });*/

    function StreamLib(resouce) {
        //this.emit('start'); this will not work
        var self = this;
         process.nextTick(function(){
             console.log(self)
             self.emit('start');
         });
    }

    util.inherits(StreamLib, EventEmitter);

    var stream = new StreamLib('foo');

    stream.on('start', function(){
      console.log("Reading has started");
    })
}

/**
 * process.nextTick() vs setTimeout(fn, 0)
 * http://howtonode.org/understanding-process-next-tick
 */
function schedule(){
    function foo(){
        console.log("foo");
    }

    function bar(){
        console.log("bar");
    }

    /*(function doTick(){
        process.nextTick(foo);
        console.log('bar');
    }());*/

    setTimeout(foo, 2000);
    process.nextTick(bar);
}