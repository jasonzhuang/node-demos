function *foo() {
    yield 2;
    return "foo"; // return value back to `yield*` expression
}

function *bar() {
    yield 1;
    var v = yield *foo();
    console.log( "v: " + v );
    yield 4;
}
var it = bar();
console.log(it.next()); // { value:1, done:false }
console.log(it.next()); // { value:2, done:false }
console.log(it.next()); // "v: foo"   { value:4, done:false }
console.log(it.next()); // { value:undefined, done:true }