var express = require("express");
var fs = require("fs");
var path = require("path");
var nunjucks = require("nunjucks");
var bodyParser = require("body-parser");
// create an express app
var app = express();

var FoodItem = require("./dao/models/food-item");

var dbConnect = require("./dao").connect;

dbConnect();
var mountApiRoutes = require("./modules").mountApiRoutes;

app.use(bodyParser.json());

// static files serving
app.use(express.static(path.join(__dirname, "public/")));
app.use("/assets", express.static(path.join(__dirname, "assets/")));

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
  watch: true
});

mountApiRoutes(app);

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
    items: [
      {
        title: "foo",
        id: 1
      },
      {
        title: "bar",
        id: 2
      }
    ]
  });
});

// json response or api
app.get("/get-users", function(request, response) {
  response.json([
    {
      username: "fdssf",
      mobile: 43433
    },
    {
      username: "fdssf",
      mobile: 43433
    },
    {
      username: "fdssf",
      mobile: 43433
    }
  ]);
});

// path binding
app.get("/get-user/:id/:name", function(request, response) {
  var params = request.params;
  console.log(params);
  response.json({
    username: params.name + params.id,
    id: params.id,
    mobile: 43433
  });
});

app.get("/add-food-item/:name",(req,res)=>{
  var foodItem = new FoodItem({
    name:req.params.name,
    quantity:10
  });

  foodItem.save().then((doc)=>{
    console.log("Item",doc);
    res.json(doc);
  })
});

app.get("/all-items",(req,res)=>{
  FoodItem.find((err,docs)=>{
    res.json(docs);  
  })
})

// default handler or not found handler
app.get("*", function(request, response) {
  console.log(request.url);
  response.status(404).send("Page not found");
});

app.listen(3000, function() {
  console.log("App running at 3000");
});
