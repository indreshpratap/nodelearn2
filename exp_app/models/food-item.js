var moongose = require("mongoose");

var food_item = moongose.Schema({
 //   _id: moongose.Schema.Types.ObjectId,
    name:moongose.Schema.Types.String,
    quantity:moongose.Schema.Types.Number
});


module.exports =  moongose.model('FoodItem', food_item);