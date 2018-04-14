var readfile = require("./execute_files");

readfile("firstquery",(err,data)=>{
    if(err){
        console.warn(err);
    }else {
        console.log(data);
    }
});