var i= 0;

(function testit(){
    for( i=0;i<1000;i++){
        console.log(i);
    }
})();

setTimeout(function(){
    console.log("running after each 2 sec");
},0);

(function testit2(){
    var sum=0;
    console.log("started");
    for( i=0;i<1000000000;i++){
       sum+=i;
    }
    console.log("sum of: "+sum);
})();

(function alertit(){
    console.log("After setinterval");
})();
