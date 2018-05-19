var express = require("express"),
    ctrl = require("./api-controller");

var router = express.Router();

module.exports = router;


// Get
router.get("/all", (req, res) => ctrl.getAllPackages(req, res));


/// Post 
router.post("/save", (req, res) => ctrl.savePackage(req, res));