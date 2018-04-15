var fs = require("fs");
var read=fs.createReadStream("output2.txt","utf8");

// attaching listener to open event
read.on("open",()=>{
    console.log("File is open");
});
read.on("data",(data)=>console.log("Received:",data));

read.on("close",()=>{
    console.log("File close");
});