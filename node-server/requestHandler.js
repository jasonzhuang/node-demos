/**
 * 
 function start(){
    console.log("Request handler 'start' was called");
    
    //mock block
    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while(new Date().getTime() < startTime + milliSeconds);
    }
    
    sleep(10000);
    return "Hello Start";
}
**/

var querystring = require("querystring"),
    fs = require("fs");
    formidable = require("formidable");
    path = require("path");
    mime = require("mime");

var BASE = "/cloud/"
//response.end() MUST be called on each response
function start(response, request) {
    console.log("Request handler 'start' was called");
    console.log(request.method);
    var body = '<html>' + 
                '<head>' + 
                '<meta charset="utf-8">' + 
                '</head>' + 
                '<body>' + 
                '<form action="/upload" enctype="multipart/form-data" method="post">' + 
                '<input type="file" name="upload"/>' + 
                '<input type="submit" value="Upload file"/>' +
                '</form>'+
                '</body>'+
                '</html>'
                
     response.writeHead(200, {"Content-Type": "text/html"});//not "text/plain"
     response.write(body);
     response.end();
}


function upload(response, request) {
    console.log("Request handler 'upload' was called");
    
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        //Error: EXDEV, Cross-device link
        //fs.renameSync(files.upload.path, "/tmp/test.png");
        console.log("upload file path: ", files.upload.path);
        if(!fs.existsSync(BASE)) {
            fs.mkdir(BASE);
            console.log("create directory: ", BASE);
        }
        var readStream = fs.createReadStream(files.upload.path);
        var writeStream = fs.createWriteStream(BASE + "test.png");
        readStream.pipe(writeSream, function(){
            fs.unlinkSync(files.upload.path);
        })

        response.writeHead(200, {"Content-Type":"text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function download(response, request){
    console.log("Request handler 'download' was called");
    
    var file = "/cloud/xian.jpg";
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);
    
    response.setHeader('Content-disposition', 'attachment; filename=' + filename);
    response.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(response);
}

function show(response, request) {
    console.log("Request handler 'show' was called");
    fs.readFile(BASE + "test.png", "binary", function(error, data){
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(data, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.download = download;