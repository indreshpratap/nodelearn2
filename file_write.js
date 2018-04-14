var fs = require("fs");

//fs.writeFileSync("output.txt","This is our content","utf8");

var contentdata = `fdslfjlsk
fsd
fdsf
sfs
fsd
fdsf
sfsf
sf
fds
fsdfds
fs
fsdf
sd
sd
fs
fsd fdsl sdf lkfs ljsd 

            fdlfjsdlfsdjflksjf lksdj flskfj
            dsflsdldfjslkjfdklssdklflkfjkldfsfsfklsflkfjsflk klsfd sk jslk fjfksd 
            
            fsdf
fdsfssfsdf            `;

fs.writeFile("output2.txt",contentdata,{encoding:"utf8",flag:"a"},(err)=>{
    if(err){
        console.log(err);
    }

});