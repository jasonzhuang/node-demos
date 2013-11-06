/**
 * Created with JetBrains WebStorm.
 * User: jason
 * To change this template use File | Settings | File Templates.
 */
var download = require("./download").download;
var savefile = require("./savefile").savefile;
var cheerio = require("cheerio");


var url = "http://www.dailymail.co.uk/news/article-2297585/Wild-squirrels-pose-charming-pictures-photographer-hides-nuts-miniature-props.html"

download(url, function(data){
    if(data){
        savefile(__dirname + "/public")(data);
        var $ = cheerio.load(data);
        $("div.artSplitter > img.blkBorder").each(function(i, e) {
            console.log($(e).attr("src"));
        });
        console.log("done");
    }else {
        console.log("crawl error");
    }
})