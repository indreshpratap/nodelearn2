var fs = require("fs");
var path = require("path");
var data;
try {
  data = fs.readFileSync("readme1.txt", "utf8");
} catch (error) {
  console.log(error);
}
console.log("Received", data);
console.log("After Sync Reading file");

console.log("---Async processing\n\n");

fs.readFile("readme.txt", "utf8", function(err, data) {
  if (err) {
  //
    console.log("Got An Error!", err);
  } else {
   // console.log("Received First Data", data);
  }
});
fs.readFile("readme12.txt", "utf8", function(err, data) {
  if (err) {
   // console.log("Got An Error!", err);
  } else {
   // console.log("Received Data", data);
  }
});

console.log("After Async Reading file\n\n");

fs.readdir(path.resolve("C:","copiedver"), (err, files) => {
  if (err) {
    console.log(err);
  } else {
    //  console.log("Files", files);

    for (let file of files) {
      fs.stat(path.resolve("..","copiedver",file), (err, stats) => {
        if (err) {
          console.log("Stats error", err);
        } else {
          if (stats.isDirectory()) {
              console.log(file, "is a Directory");
            } else {
                console.log(file, "is a File");
          }
        }
      });
    }
  }
});






