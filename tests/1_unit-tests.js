/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();


suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '123456789.123456789l'
      assert.equal(convertHandler.getNum(input),123456789.123456789)
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '80/10l'
      assert.equal(convertHandler.getNum(input),8)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '800/10.5'
      assert.equal(convertHandler.getNum(input),76.19047619047619)
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '8000/10/22'
      assert.equal(convertHandler.getNum(input),'Invalid Input')
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = "dad"
      assert.equal(convertHandler.getNum(input),"Invalid Input")
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      var input = ['gal','l','mi','km','lbs','kg','gal','l','mi','km','lbs','kg'];
       var expected = ['l','gal','km','mi','kg','lbs','l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele,i) {
        assert.equal(convertHandler.getUnit(ele),input[i] )
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = ['gat','lgg','gl','lu','mio','k','lb','kt'];
      input.forEach(function(ele,i) {
        assert.equal(convertHandler.getUnit(ele), 'Invalid unit' )
      });
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect= ['gallon', 'liter', 'mile', 'kilometer', 'pound', 'kilogram']
      
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
       
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
       var input = [5, 'L'];
      var expected = 5/3.78541;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
       var input = [5, 'Mi'];
      var expected = 5*miToKm;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
       var input = [5, 'Km'];
      var expected = 5/miToKm;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
       var input = [5, 'Lbs'];
      var expected = 5*lbsToKg
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
       var input = [5, 'KG'];
      var expected = 5/lbsToKg
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});