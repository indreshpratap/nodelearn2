var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var querystring = require("querystring");

function preProcessUrl(request) {
  var parsed = url.parse(request.url);
  request.parsedUrl = parsed.pathname;
  var data = querystring.parse(parsed.query);
  console.log(data);
  request.params = data;
}
function process(request, response) {
  preProcessUrl(request);
  console.log(url.parse(request.url));
  console.log("url", request.url);
  console.log(request.headers);
  console.log(request.method);
  try {
    if ((/api/).test(request.parsedUrl)) {
        response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(request.params));
    } else {
      response.writeHead(200, { "custom-header": "fdslfkjs l fkjdslk jf" });
      response.end(
        fs.readFileSync(
          path.join(__dirname, "public", request.parsedUrl),
          "utf8"
        )
      );
    }
  } catch (error) {
      console.warn(error);
    response.writeHead(404, { "Not-found": "No content found" });
    response.end();
  }
}

var server = http.createServer(process);

server.listen(3000);
console.log("Server is running at 3000");
