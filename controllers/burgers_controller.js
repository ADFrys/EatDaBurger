var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// Get request to display the burgers
router.get("/index", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// Post request to add the new burger
router.post("/api/burgers", function(req, res) {

  burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
    res.json({ id: result.insertId });
  });
});

// Put request to update the burger devoured status
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {

      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;