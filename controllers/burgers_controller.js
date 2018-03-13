var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");


router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var burgerObject = {
      burgers: data
    };
    console.log(burgerObject);
    res.render("index", burgerObject);
  });
});





module.exports = router;