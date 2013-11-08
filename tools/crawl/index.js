/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var download = require("./download").download;
var cheerio = require("cheerio");
var path = require("path");
var fs = require("fs");

(function(){
    //crawl();
    loadTemplate();
}());

function loadTemplate(){
   var url = "http://st3.yxp.126.net/img2012/flash2/xml/template/te186228.xml";
   download(url, function(data){
       var filepath = path.join(__dirname, "public", new Date().getTime() + ".xml");
       var writable = fs.createWriteStream(filepath, {flags: 'a+', encoding:"utf8"});
       writable.write(data);
       console.log("done");
   });
}

function crawl(){
    var url = "http://www.dailymail.co.uk/news/article-2297585/Wild-squirrels-pose-charming-pictures-photographer-hides-nuts-miniature-props.html"
    download(url, function(data){
        if(data){
            var $ = cheerio.load(data);
            var filepath = path.join(__dirname, "public", new Date().getTime() + ".txt");
            var writable = fs.createWriteStream(filepath, {flags: 'a+', encoding:"utf8"});
            $("div.artSplitter > img.blkBorder").each(function(i, e) {
                writable.write($(e).attr("src"));
                writable.write("\r\n");
                console.log($(e).attr("src"));
            });
            console.log("done");
        }else {
            console.log("crawl error");
        }
    });
}

