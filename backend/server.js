
var express = require('express'),
    request = require('request'),
    _ = require('underscore'),
    http=require('http'),
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

expressApp.get('/gmaps', function(req, res){
  fs.readFile('frontend/gmaps.html', 'utf-8', function(err, data){
    res.send(data);
  });
});

expressApp.get('/proxy', function (req, res){
  handleProxy(req, res);
});

expressApp.get('/backend/gmaps/shapes', function(req, res){

  var dep = 'all';
  

  var target = {
    host: 'fr2012.election-maps.appspot.com',
    port: 80,
    path: '/results/shapes/json/'+getRemoteDeptFileName(dep),
    'content-type': 'text/plain'
  };

  http.get(target, handleAppSpotResponse);

  for (var i=96;i-->1;){

    if (i==20){
      //Corsica
      target.path =  '/results/shapes/json/'+getRemoteDeptFileName('02A');
      http.get(target, handleAppSpotResponse);
      target.path =  '/results/shapes/json/'+getRemoteDeptFileName('02B');
      http.get(target, handleAppSpotResponse);
    }
    else{
      var tmp=i>99 ? i : (i>9 ? '0'+i : '00'+i);

      target.path =  '/results/shapes/json/'+getRemoteDeptFileName(tmp);
      http.get(target, handleAppSpotResponse);  
    }
    
    
  }

  res.send('work in progress');

});

function handleAppSpotResponse(answer){

var match = answer.socket._httpMessage.path.match(/france\-([^\-]*)\-goog/);
if (match){
  var dep = match[1]=='FR' ? 'all' : match[1];
}
else return;



  var localPath = 'frontend/data/gmaps/';
  var filename = localPath += dep+'.js';
  //console.log('STATUS: ' + answer.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(answer.headers));
    answer.setEncoding('utf8');
    var data='';
    answer.on('data', function (chunk) {
      data += chunk;
    });
    answer.on('end', function(){
      console.log('end',dep, data.length)
      eval(data);
      
    });
    /* google sniff callback */
    function loadGeoJSON(data){
      //console.log(data, data.departement.features)
      data = JSON.stringify(dep=='all' ? data.departement : data.commune);

      fs.writeFile(filename, 'define([], function(){return '+data+'});', function(err){
        if (err){
         // return res.send('An error occured :'+err, 500);
        }
        //return res.send('Done');

      });
  }
    
}

function getRemoteDeptFileName(dep){
  switch (dep){
    case 'all':
      return 'france-FR-goog_geom4096.js';
      break;
    default:
      return 'france-'+dep+'-goog_geom.js'
      return dep;

  }
}

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