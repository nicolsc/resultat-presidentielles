
var express = require('express'),
    request = require('request'),
    fs = require('fs'),
    requirejs=require('requirejs'),
    expressApp = express.createServer(),
    port=process.env.PORT || 40104;


testPath = __dirname+'/../frontend';
expressApp.use(express.static(testPath));
expressApp.use(express.bodyParser());

expressApp.get("/",function(req,res,next) {
  fs.readFile("frontend/index.html","utf-8",function(err,data) { 
    res.send(data);
  });
});

expressApp.listen(port);
console.log('Server listening on port', port)


var serialize = function(obj) {
  var str = [];
  for(var p in obj)
     str.push(p + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
};