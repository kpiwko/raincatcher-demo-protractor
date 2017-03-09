var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports.waitNotPresent = function(selector) {
  var elm = $(selector);
  return browser.wait(function() {
    return browser.isElementPresent(elm) //if element is already present, this line will evaluate to true
      .then(function(present) {
        return !present;
      }); // this modifies the previous line so that it evaluates to false until the element is no longer present
  }, 30000);
};

module.exports.waitPresent = function(selector) {
  var elm = $(selector);
  browser.wait(function() {
    return browser.isElementPresent(elm);
  }, 30000);
  expect(browser.isElementPresent(elm)).eventually.to.be.true;
};

module.exports.waitClickable = function(selector) {
  var elm = $(selector);
  var EC = protractor.ExpectedConditions;
  browser.wait(EC.elementToBeClickable(elm), 30000);
};