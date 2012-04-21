
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

expressApp.get('/proxy', function (req, res){
  handleProxy(req, res);
});

function handleProxy(req, res){
   var rq = {'uri':decodeURIComponent(req.param("url")),'method':req.param('method')||'GET'};
   console.log('rq', rq)
    if (req.body && req.body.body!==undefined) {
        rq["body"] = serialize(req.body.body);
        rq["headers"] = {"Content-Type":req.headers.Accept || "application/x-www-form-urlencoded"};
    } else {
        rq["headers"] = {"Content-Length":"0"};
    }
    request(rq,function(error, response, body) {
      console.log('Proxy answer', req.header('Accept'))
        res.send(body,{'Content-Type':req.header('Accept')});
    });
}


expressApp.listen(port);
console.log('Server listening on port', port)


var serialize = function(obj) {
  var str = [];
  for(var p in obj)
     str.push(p + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
};