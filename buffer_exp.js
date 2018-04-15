
var buf= Buffer.alloc(5);
console.log("empty buffer",buf);
buf.write("Hel");

console.log('Buffer',buf);

console.log("String format",buf.toString());
let jsonbuf = buf.toJSON();
console.log(jsonbuf);
console.log(JSON.stringify(jsonbuf));

let buf2 = Buffer.from(jsonbuf);
console.log(buf2.toString());
console.log(buf2.length);
console.log(buf2.byteLength);
let str="Hello User 漢字";
let buf3 = Buffer.from(str);

console.log(str.length);
console.log(buf3.byteLength);
console.log(buf3.toString());


//console.log(global);
