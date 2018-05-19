var express = require('express');

var flightApiRoutes = require("./flight/api-routes"),
    packageApiRoutes = require("./package/api-routes");

module.exports = {
    mountApiRoutes: mountApiRoutes,
}


function mountApiRoutes(expressApp) {
    var api = express.Router();
    
    // Binding to api router
    api.use("/flight", flightApiRoutes);
    api.use("/package", packageApiRoutes);


    // Attaching api to main express app
    expressApp.use("/api", api);

}