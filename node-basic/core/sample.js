console.log("module initializing");
function Rect(w,h) {
    this.w = w;
    this.h = h;
};

Rect.prototype.area = function(){
    return this.w*this.h;
};

/*console.log(module.exports === exports);//true
//exports = Rect; //this would not work, exports = module.exports = Rect will work
module.exports = Rect;
console.log(module.exports);//function
console.log(exports);//object
console.log(module.exports === exports);//false

console.log("module complete");*/
