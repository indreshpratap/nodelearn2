var readFile = require("./execute_promise");

readFile("firstquery")
    .then(function(value) { return readFile(value)})
  .then(value => readFile(value))
  .then(value => console.log(value), err => console.warn("Got Error",err));
