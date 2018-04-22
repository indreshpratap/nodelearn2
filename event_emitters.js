var events = require("events");

function customEmitter(){
var myemitter = new events.EventEmitter();
process.nextTick(()=>{
    myemitter.emit("open","Emitter is open");

});
setTimeout(()=>{
    myemitter.emit("data","Emitted data 1");
    myemitter.emit("data","Emitted data 1one");
    myemitter.emit("data","Emitted data 1 two");
    myemitter.emit("data","Emitted data 1three");
    myemitter.emit("error","You got an error");
},1000);

setTimeout(()=>{
    myemitter.emit("data","Emitted data 2");
},2000);

setTimeout(()=>{
    myemitter.emit("close");
},3000);
return myemitter;
}

// myemitter.on("data",(data)=>{
//     console.log(data);
// });


// myemitter.on("open",(data)=>{
//     console.log(data);
// });

// myemitter.on("data",(data)=>{
//     console.log("second",data);
// });
module.exports=customEmitter;