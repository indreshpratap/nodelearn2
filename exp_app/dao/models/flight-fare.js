var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flightFareSchema = new Schema({
 
    from: String,
    to: String,
    airline_id: String,
    fare: Number,
    direct_stop: Boolean,
    type: String,
    date_from: Date,
    date_to: Date,
    date_from_num: Number,
    date_to_num: Number,
    active: Boolean,
});

var FlightFare = mongoose.model("flight_fare",flightFareSchema);

module.exports = FlightFare;