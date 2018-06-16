var express = require("express");
var fs = require("fs");
var path = require("path");
var nunjucks = require("nunjucks");
var bodyParser = require("body-parser");
var session = require("express-session");
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// create an express app
var app = express();

var FoodItem = require("./dao/models/food-item");

// mongodb
var dbConnect = require("./dao").connect;
var connection = dbConnect();

// postgres db
var {pgdbConnect,pgQuery} = require('./db/pgdb');

pgdbConnect(); 

var mountApiRoutes = require("./modules").mountApiRoutes;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// static files serving
app.use(express.static(path.join(__dirname, "public/")));
app.use("/assets", express.static(path.join(__dirname, "assets/")));

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
  watch: true
});


app.use(session({
  secret: 'learn',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: connection }),
  cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
  // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function (user, done) {
  done(null, user);
});

/*  // dummy local strategy
passport.use(new LocalStrategy(function (username, password, done) {
  if (username != 'demo' || password !== 'demo') {
    done(null, false);
  } else if (username === 'demo' && password === "demo") {
    done(null, { id: 1, username: 'demo', role: 'user' });
  }else if (username === 'admin' && password === "admin") {
    done(null, { id: 1, username: 'admin', role: 'admin' });
  }

}));
*/
// DB specific
passport.use(new LocalStrategy(function (username, password, done) {
  var query = {
    text:"select id,name,user_role from tracking_users where email= $1 and enc_password=$2 and active=1",
    values:[username,password]
  }
  pgQuery(query,(err,res)=>{
    if(err) {done(err,false);}
    else {
      var user = res.rows && res.rows.length>0? res.rows[0] : null;
      if(user===null){
        done(null, false);
      }else {
        done(null,{id:user.id,name:user.name,role:user.user_role});
      }

    }
  });


}));

// A middleware 
app.use(function (req, res, next) {
  console.log("Logging - ", req.url);
  if (req.url === '/about-us') {
    res.send("Returned by middleware");
  } else {
    next();
  }
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user);
    next();
  } else {
    res.redirect("/error");

  }
}

function checkRole(role) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      next();
    } else {
      res.redirect("/error");
    }
  }
}

mountApiRoutes(app);

// added route
// app.get("/", function (request, response) {

// if(request.session.views){
//   request.session.views=1;
// }else {
//   ++request.session.views;
// }

//   console.log("views");

//   response.send(
//     fs.readFileSync(path.join(__dirname, "public", "index.html"), "utf8")
//   );
// });
app.get("/login", (req, res) => {
  res.render("login.html");
})

app.post("/dologin", passport.authenticate('local', { failureCallback: "/error" }), (req, res) => {
  res.redirect("/success");
  //res.send("You are logged in");
});

app.get("/error", (req, res) => {
  res.status(500).send("Error");
});

app.get("/success", (req, res) => {
  res.send("Login successfull")
});

app.get("/check-pgdb",(req,res)=>{
  pgQuery("select * from tracking_users",(err,data)=>{
    res.json(data.rows);
  });
});


app.get("/user-info",(req,res)=>{
  if(req.isAuthenticated()){
    res.json(req.user);
  }else {
    res.status(403).json({error:"User not loggedin!"});
  }
});
app.get("/about-us", function (request, response) {
  // console.log(request.url);
  // console.log(request.query);

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


app.get("/session", checkRole('student'), (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views = ++req.session.views;
  }
  console.log(req.session.views);

  res.send("Session page: " + req.session.views);
});


app.get("/delete-item", isAuthenticated, checkRole('admin'), (req, res) => {
  res.send("Yes deleted item");
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => console.log(err));
  res.send("loggedout");
});
// json response or api
// route specific middleware
app.get("/get-users", function (req, res, next) {

  console.log("Middleware for get-users");

  //next();// calling next handler

  // next("No users"); // when calling with a parameter except 'route' it will be reported as an error

  next('route');  // calling the next matching route

}, function (request, response) {
  console.log("Sending users");

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

// defining wild card route which will be executed for any url starting with 'get-'
app.get("/get-*", (req, res) => {
  res.send("Received by second matching route");
});

// path binding
app.get("/get-user/:id/:name", function (request, response) {
  var params = request.params;
  console.log(params);
  response.json({
    username: params.name + params.id,
    id: params.id,
    mobile: 43433
  });
});

app.get("/add-food-item/:name", (req, res) => {
  var foodItem = new FoodItem({
    name: req.params.name,
    quantity: 10
  });

  foodItem.save().then((doc) => {
    console.log("Item", doc);
    res.json(doc);
  })
});

app.get("/all-items", (req, res) => {
  FoodItem.find((err, docs) => {
    res.json(docs);
  })
})

// default handler or not found handler
app.get("*", function (request, response) {
  console.log(request.url);
  response.status(404).send("Page not found");
});

app.listen(3000, function () {
  console.log("App running at 3000");
});
