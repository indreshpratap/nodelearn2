var path = require("path");
console.log(__dirname);
console.log(__filename);

console.log("dirname",path.dirname(__filename));
console.log("dirname",path.dirname("documents/ngnotes"));
console.log(
 path.extname("mydocu.pdf"));
console.log('format',path.format({dir:"documents",name:"filename",ext:".doc"}));

console.log('join',path.join("first","second","third","myfile.png"));
console.log('join',path.join("first","second","third","..","myfile.png"));



