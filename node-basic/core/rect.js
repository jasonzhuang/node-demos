function Rect(w,h) {
    this.w = w;
    this.h = h;
};

Rect.prototype.area = function(){
    return this.w*this.h;
};

module.exports.create = function(w,h){
    return new Rect(w,h);
}

var warn = function(message) {
  console.log("Warning: " + message);
};

var info = function(message) {
  console.log("Info: " + message);
};

var error = function(message) {
  console.log("Error: " + message);
};

console.log(exports);//{ create: [Function] }
module.exports.Rect = Rect;
console.log(exports);//{ create: [Function], Rect: [Function:Rect]}
