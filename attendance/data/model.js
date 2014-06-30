/**
 * Created by yougen.zhuangyg on 2014/6/22.
 */
function idFromName(slug){
    return slug && slug.toLowerCase().replace(/\W/g, '');
}

var Activity = function(data){
    Object.keys(data).forEach(function(key){
       this[key] = data[key];
    },this);
    this.id = this.id || idFromName(this.slug);
}

exports.Activity = Activity;