var fs = require("fs");
function readFile(firstquery, callback) {
  fs.readFile(firstquery, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      fs.readFile(data,"utf8", (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          fs.readFile(data,"utf8", (err, data) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, data);
            }
          });
        }
      });
    }
  });
}

module.exports= readFile;
