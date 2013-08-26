(function execute(){
    case1();
})();

function case1() {
    process.nextTick(function() {
      console.log('nextTick callback');
    });    
}
