var express = require("express"),
    ctrl = require("./api-controller");

var router = express.Router();

module.exports = router;


// Get
router.get("/all-fares", (req, res) => ctrl.getAllFares(req, res));


/// Post 
router.post("/save-fare", (req, res) => ctrl.saveFare(req, res));
