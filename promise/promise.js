/**
 * Created by yougen.zhuangyg on 2015/1/16.
 */
var Promise = function(){
    this.queue = [];
    this.isPromise = true;
};

Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler){
    var handler = {};
    if(typeof fulfilledHandler === 'function'){
        handler.fulfilled = fulfilledHandler;
    }
    if(typeof errorHandler === 'function'){
        handler.error = errorHandler;
    }
    if(typeof progressHandler === 'function'){
        handler.error = errorHandler;
    }
    this.queue.push(handler);
    return this;
};

var Deferred = function(){
    this.promise = new Promise();
};

Deferred.prototype.resolve = function(obj){
    var promise = this.promise;
    var handler;
    while((handler = promise.queue.shift())){
        if(handler && handler.fulfilled){
            var ret = handler.fulfilled(obj);
            if(ret && ret.isPromise){
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
};

Deferred.prototype.reject = function(err){
    var promise = this.promise;
    var handler;
    while((handler = promise.queue.shift())){
        if(handler && handler.error){
            var ret = handler.error(err);
            if(ret && ret.isPromise){
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
};

Deferred.prototype.callback = function(obj){
    var that = this;
    return function(err, ret){
        if(err){
            return that.reject(err);
        }
        that.resolve(ret);
    };
};

module.exports = Deferred;