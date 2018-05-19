var models = require("../../dao/").models.FlightFare;

module.exports = {
    saveFare: saveFare,
    getAllFares: getAllFares
}

function saveFare(req, res) {
    var body = req.body;
    var flight = new FlightFare(body);
    flight.save().then(function (err, data) {
        res.json(data)
    });
}

function getAllFares(req, res) {

}