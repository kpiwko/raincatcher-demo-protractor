var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
var EC = protractor.ExpectedConditions;

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

/**
 *
 * @param locator - any locator used to select an element
 * @param time - time in ms to wait
 */
module.exports.waitUntilClickable = function(locator, time) {
  time = time || 2000;
  browser.wait(EC.elementToBeClickable(locator), time);
};

/**
 *
 * @param locator - any locator used to select an element
 * @param time - time in ms to wait (default 2000)
 */
module.exports.waitUntilPresent = function(locator, time) {
  time = time || 2000;
  var message = "waiting for "  + time + "ms for locator to be present";
  browser.wait(EC.presenceOf(locator), time, message);
  expect(locator.isPresent()).eventually.to.be.true;
};

/**
 *
 * @param locator - locator used to select an element
 * @param expectedValue - expected value to be retrieved by the locator
 */
module.exports.checkElementVisibilityAndValue = function(locator, expectedValue) {
  expect(locator.isPresent()).eventually.to.be.true;
  expect(locator.getText()).eventually.to.equal(expectedValue);
};

/**
 *
 * @param locators - array of selectors to test visibility of elements
 */
module.exports.checkElementsArePresent = function(locators) {
  for (var i = 0; i < locators.length; i++) {
    expect(locators[i].isPresent()).eventually.to.be.true;
  }
};

/**
 *
 * @param locators - array of selectors to get values from
 * @param expectedValues - the expected values to retrieve from the selectors
 */
module.exports.checkValuesAreCorrect = function(locators, expectedValues) {
  for (var i = 0; i < locators.length; i++) {
    expect(locators[i].getText()).eventually.to.equal(expectedValues[i]);
  }
};

/**
 *
 * @param locators - selector calling a list of items
 * @param expectedSize - expected size of the list
 */
module.exports.checkListSize = function(locators, expectedSize) {
  expect(locators.count()).eventually.to.equal(expectedSize);
};

/**
 *
 * @param locator - locator within the menu that is used to navigate to
 */
module.exports.navigateToSection = function(locator) {
  var menu = element(by.css("[aria-label*=Menu]"));
  menu.isDisplayed().then(function(isDisplayed) {
    if (isDisplayed) {
      menu.click();
    }

    locator.click();
  });
};