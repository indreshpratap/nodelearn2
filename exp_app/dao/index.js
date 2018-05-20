var mongoose = require("mongoose");
var FlightFare = require("./models/flight-fare");
module.exports = {
    connect: connect,
    models: {
        FlightFare: FlightFare
    }
};


function connect() {
    // mongoose.connect(
    //     "mongodb://mongotest:mongo_test@ritucluster-shard-00-00-kgfcu.mongodb.net:27017,ritucluster-shard-00-01-kgfcu.mongodb.net:27017,ritucluster-shard-00-02-kgfcu.mongodb.net:27017/test?ssl=true&replicaSet=ritucluster-shard-0&authSource=admin"
    // );
    
    mongoose.connect(
        "mongodb://localhost:27017/tourstore"
    );
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected");
    });
}