/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  var re = /([\d|.|/]*)(\w*)/i;

  this.getNum = function(input) {
    var str = input;
    //If first capture group is empty, it means no number was entered and input is invalid
    var result = str.match(re)[1] || "Invalid Input";
    if (result.indexOf("/") > -1) {
      var index = result.indexOf("/");
      var left = result.substring(0, index);
      var right = result.substring(index + 1);
      result = left / right;
    }
    if (isNaN(result)) {
      return "Invalid Input";
    }
    return Number(result);
  };

  this.getUnit = function(input) {
    var units = ["gal", "l", "mi", "km", "lbs", "kg"];
    var str = input;
    var result = str.match(re)[2];
    var resultToLower = result.toLowerCase();
    if (units.includes(resultToLower)) {
      return result;
    } else {
      return "Invalid unit";
    }
  };

  this.getReturnUnit = function(initUnit) {
    var result = initUnit.toLowerCase();

    var units = {
      kg: "lbs",
      l: "gal",
      km: "mi",
      mi: "km",
      gal: "l",
      lbs: "kg"
    };
    return units[result];
  };

  this.spellOutUnit = function(unit) {
    var unitNames = {
      kg: "kilogram",
      l: "liter",
      km: "kilometer",
      mi: "mile",
      gal: "gallon",
      lbs: "pound"
    };
    return unitNames[unit];
  };

  this.convert = function(initNum, initUnit) {
    var result;
    var initialUnit = initUnit.toLowerCase();
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var convertedUnits = {
      kg: "lbs",
      l: "gal",
      km: "mi",
      mi: "km",
      gal: "l",
      lbs: "kg"
    };

    switch (initialUnit) {
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;

      default:
        result;
    }

    return Number(result);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result =
      "" +
      initNum +
      " " +
      initUnit +
      " converts to " +
      returnNum.toFixed(5) +
      " " +
      returnUnit;

    return result;
  };
}

module.exports = ConvertHandler;
