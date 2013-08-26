/**
 * refer:http://book.mixu.net/single.html
 * ###case study###:
 *  for(var i = 1; i <= 1000; i++) {
 *     fs.readFile('./'+i+'.txt', function() {
 *        // do something with the file
 *     });
 *  }
 *  do_next_part();
 * 
 *  #####goal#####:
 *  1. control the order of execution: a way to control the order in which the file reads are done
 *  2. collect data: some way to collect the result data for processing
 *  3. limit concurrency: some way to restrict the concurrency of the file read operations to conserve limited system resources
 *  4. call the next step in the program: a way to determine when all the reads necessary for the do_next_part() are completed
 */
function async(arg, callback) {
    var delay = Math.floor(Math.random()*5 + 1) * 1000;
    console.log('do something with \'' + arg + '\', return ' + delay +  ' ms later');
    setTimeout(function(){callback(arg);}, delay);
}

function final(){console.log('Done', results)};

//A simple async series
var items = [1,2,3,4,5,6];
var results = [];

//Tags:sequential(call next task in the callback), no-concurrency, order
/*
(function(){
    function series(item) {
        if(item) {
            async(item, function(arg) {
                var result = arg*2 + 100;
                results.push(result);
                return series(items.shift());//recursive         
            });
        } else {
            return final();
        }
    }
    series(items.shift());
})();*/




//Tags:parallel, full-concurrency, no guarantee of the order

/*
(function(){
    items.forEach(function(item){
        async(item, function(result){
            results.push(result);
            if(results.length == items.length) {
                final();
            }
        })
    });
})();
*/

//Tags:Limited parallel, no guarantee of order

(function(){
    var running = 0;
    var limit = 2;
    function launcher(){
        while(running< limit && items.length > 0) {
            var item = items.shift();
            async(item, function(result) {
                results.push(result);
                running--;
                if(items.length > 0) {
                    launcher();
                } else if(running == 0) {
                    final();
                }
            });
            running++;
        }
    }
    
    launcher();
})();

