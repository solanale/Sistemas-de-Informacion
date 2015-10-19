var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Hola Mundol");
  response.end();
}

http.createServer(onRequest).listen(8888);