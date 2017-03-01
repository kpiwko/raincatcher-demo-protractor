var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

//var expect = chai.expect;

module.exports.waitNotPresent = function(selector) {
  var elm = $(selector);
  return browser.wait(function() {
    return browser.isElementPresent(elm) //if element is already present, this line will evaluate to true
      .then(function(present) {
        return !present;
      }); // this modifies the previous line so that it evaluates to false until the element is no longer present
  }, 10000);
};

module.exports.waitPresent = function(selector) {
  var elm = $(selector);
  return browser.wait(function() {
    return browser.isElementPresent(elm);
  }, 10000);
};

//var until = protractor.ExpectedConditions;
//browser.wait(until.presenceOf(elem), 5000, 'Element taking too long to appear in the DOM');

// we're looking for when the element doesn't have a .disabled class
// var availableElement = by.css('.some-class:not(.disabled)');
// browser.wait(function() {
//   return ptor.isElementPresent(availableElement);
// }, 30000);

// expect(ptor.isElementPresent(availableElement)).toBeTruthy();