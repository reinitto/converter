"use strict";
var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function(req, res) {
    var errors = [];
    var input = req.query.input;
    if (!input) {
      errors.push("No input, please input numbers and units");
    }
    var initNum = convertHandler.getNum(input);
    if (typeof initNum !== "number") {
      errors.push("Not a number");
    }

    var initUnit = convertHandler.getUnit(input);
    if (initUnit == "Invalid unit") {
      errors.push("Invalid unit");
    }
    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    console.log("errors length:", errors.length);
    if (errors.length != 0) {
      res.json(errors);
    } else {
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    }
  });
};
