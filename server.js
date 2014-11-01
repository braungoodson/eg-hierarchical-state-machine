var express = require('express'),
  server = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 30000,
  staticRoot = __dirname;

server.use('/', express.static(staticRoot));
server.use(bodyParser.urlencoded({entended:false}));
server.post('/root/child',function(q,r){
  var markup = '';
  markup += '<h3>child.html</h3>';
  markup += '<code>'+JSON.stringify(q.body)+'</code>';
  r.send(markup);
});
server.listen(port);
console.log('http://localhost:'+port);
