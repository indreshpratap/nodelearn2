var express = require("express");
var fs = require("fs");
var path = require("path");
var nunjucks = require("nunjucks");
// create an express app
var app = express();

// static files serving
app.use(express.static(path.join(__dirname,"public/")));


nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
  watch: true
});

// added route
app.get("/", function(request, response) {
  console.log(request.url);
  response.send(
    fs.readFileSync(path.join(__dirname, "public", "index.html"), "utf8")
  );
});

app.get("/about-us", function(request, response) {
  console.log(request.url);
  console.log(request.query);
  response.render("aboutus.html", {
    companyname: request.query.info,
    items: [{ title: "foo", id: 1 }, { title: "bar", id: 2 }]
  });
});

// json response or api
app.get("/get-user", function(request, response) {
  response.json([
    { username: "fdssf", mobile: 43433 },
    { username: "fdssf", mobile: 43433 },
    { username: "fdssf", mobile: 43433 }
  ]);
});

// default handler or not found handler
app.get("*", function(request, response) {
  console.log(request.url);
  response.status(404).send("Page not found");
});
app.listen(3000, function() {
  console.log("App running at 3000");
});
