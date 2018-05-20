var FlightFare = require("../../dao/").models.FlightFare;

module.exports = {
    saveFare: saveFare,
    getAllFares: getAllFares
}

function saveFare(req, res) {
    var body = req.body;
    console.log(body);
    var flight = new FlightFare(body);
    flight.save().then(function (data) {
        console.log(data);
        res.json(data);
    });
}

function getAllFares(req, res) {
FlightFare.find().then(data=>res.json(data));
}