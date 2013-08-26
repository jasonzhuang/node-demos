(function execute(){
    //buffer();
    //utilUse();
    //emitter();
    //process();
    module();
})();

function module(){
    var util = require("util");
    
    var Rect = require("./rect");
    console.log(Rect);//{ create: [Function], Rect: [Function: Rect]}
}

function process(){
    var spawn = require("child_process").spawn,
        grep = spawn("dir");
    console.log("Spawned child pid: " + grep.id);
    grep.stdin.end();
}

function emitter(){
    var EventEmitter = require('events').EventEmitter,
        util = require("util");
    var Ticker = function(){
        var self = this;
        setInterval(function(){
            self.emit("tick");
        }, 1000)
    };
    
    util.inherits(Ticker, EventEmitter);
    
    var ticker = new Ticker();
    ticker.on("tick", function(){
        console.log("tick...");
    });
}

function utilUse(){
    var util = require("util");
    console.log(util.inspect({name:'yougen'},{showHidden:true}));
}

function buffer(){
    var buffer = new Buffer(100);
    for(var i=0;i<100;i++) {
        buffer[i] = i;
    }
    //var sliced = buffer.slice(40, 60);
    // for(var i=0;i<sliced.length;i++){
        // console.log(sliced[i]);
    // }
    var buff2 = new Buffer(20);
    buffer.copy(buff2, 0, 0 ,20);
}