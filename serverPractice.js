var express = require("express");
var path = require("path");
var morgan = require("morgan");
var app = express();

app.use(morgan("short"));
var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));
// app.use (function(req,res,next){
//     console.log("Require IP:" + req.url);
//     console.log("Request date:" + new Date());
//     next();
// });

// app.use(function(req,res,next){
//     var filePath = path.join(_dirname, "static", req.url);
//     fs.stat(filePath, function(err, fileInfo){
//         if(err){
//             next();
//             return;
//         }
//         if (fileInfo.isFile()){
//             res.sendFile(filePath);
//         }
//         else{
//             next();
//         }
//     });
// });
app.use(function(req,res){
    res.status(404);
    res.send("File not found)");
});

app.listen(3000, function(){
    console.log("App started on port 3000");
});