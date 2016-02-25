
var http = require('http');
var fs = require('fs');
var url = require("url");
var vm = require("vm");


function send404(response) {
  response.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  response.write('Error 404: resource not found.');
  response.end();
}

var presto = require('presto-client');
var client = new presto.Client({
  user: 'root',
  catalog: 'hive',
  schema: 'default',
  host:'192.168.186.132',
  port:8089});

var server = http.createServer(function (request, response) {

  var url_obj = url.parse(request.url, true);
  var pathname = url_obj.pathname;
  var path = "scripts/" + pathname;

  fs.exists(path, function (exists) {
    if (exists) {
      // 加载文件
      fs.readFile(path, function (err, data) {
        if (err) {
          send404(response);
        } else {

          // 执行函数
          var context = vm.createContext({
            require:require,
            console:console,
            request:request,
            response:response,
            presto:client
          });
          // this snippet should be user supplied, arbitrary javascript
          var script = vm.createScript(data);
          var fn = script.runInContext(context);

          response.writeHead(200, {'content-type': 'text/json;charset=utf-8'
          });
          // 传递参数
          fn(url_obj.query);

          delete fn;
        }
      });
    } else {
      send404(response);
    }
  });

});

server.listen(3000, function () {
  console.log("Server listening on port 3000.");
});
