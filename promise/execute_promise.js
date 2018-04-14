var fs = require("fs");

module.exports = function(firstquery){
    return new Promise((resolve,reject)=>{
        fs.readFile(firstquery,"utf8",(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    });
}