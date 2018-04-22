var customemitter = require("./event_emitters");

var em = customemitter();
em.on("open", data => {
  console.log(data);
});

em.on("data", data => {
  console.log(data);
});

em.on("error", data => {
    console.log(data);
  });

  em.on("close", () => {
    console.log("Done the work");
  });


//   console.log(global);
