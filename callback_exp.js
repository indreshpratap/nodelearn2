function compute(a, b, callback) {
  var sum = a + b;
  console.log(sum);
  if (callback) {
    callback("completed", sum);
  }
}

function mycallback(req, value) {
  console.log("Done ", req, value);
}

//var // = 0;
function delayProcessing(a, b, cb) {
  setTimeout(function() {
    var sum = a + b;
    cb("Sum of " + a + "+" + b + "=", sum);
  }, 2000);
}

function sumTillMax(max, callback) {
  setTimeout(function() {
    var sum = 0;
    for (var i = 0; i < max; i++) {
      sum += i;
    }
    callback(sum);
  }, 100);
}
compute(10, 15, mycallback);

delayProcessing(10, 100, mycallback);
delayProcessing(300, 100, mycallback);

sumTillMax(100000000, function(value) {
  console.log("First Received: ", value);
});

sumTillMax(1000, function(value) {
  console.log("Second Received: ", value);
});

// setTimeout(function() {
//   mycallback("delay processing", sum);
// }, 3000);
