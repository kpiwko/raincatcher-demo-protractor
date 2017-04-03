var _ = require('lodash');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
var EC = protractor.ExpectedConditions;

var waitPresent = function(selector) {
  var elm = $(selector);
  browser.wait(function() {
    return browser.isElementPresent(elm);
  }, 30000);
  expect(browser.isElementPresent(elm)).eventually.to.be.true;
};

var waitNotPresent = function(selector) {
  var elm = $(selector);
  return browser.wait(function() {
    return browser.isElementPresent(elm) //if element is already present, this line will evaluate to true
      .then(function(present) {
        return !present;
      }); // this modifies the previous line so that it evaluates to false until the element is no longer present
  }, 30000);
};

/**
 *
 * @param locator - any locator used to select an element
 * @param time - time in ms to wait
 */
var waitUntilClickable = function(locator, time) {
  time = time || 2000;
  browser.wait(EC.elementToBeClickable(locator), time);
};

/**
 *
 * @param locator - any locator used to select an element
 * @param time - time in ms to wait (default 2000)
 */
var waitUntilPresent = function(locator, time) {
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
var checkElementVisibilityAndValue = function(locator, expectedValue) {
  expect(locator.isPresent()).eventually.to.be.true;
  expect(locator.getText()).eventually.to.equal(expectedValue);
};

/**
 *
 * @param locators - array of selectors to test visibility of elements
 */
var checkElementsArePresent = function(locators) {
  for (var i = 0; i < locators.length; i++) {
    expect(locators[i].isPresent()).eventually.to.be.true;
  }
};

/**
 *
 * @param locators - array of selectors to get values from
 * @param expectedValues - the expected values to retrieve from the selectors
 */
var checkValuesAreCorrect = function(locators, expectedValues) {
  for (var i = 0; i < locators.length; i++) {
    expect(locators[i].getText()).eventually.to.equal(expectedValues[i]);
  }
};

/**
 *
 * @param locators - selector calling a list of items
 * @param expectedSize - expected size of the list
 */
var checkListSize = function(locators, expectedSize) {
  expect(locators.count()).eventually.to.equal(expectedSize);
};

/**
 *
 * @param locator - locator within the menu that is used to navigate to
 */
var navigateToSection = function(locator) {
  var menu = element(by.css("[aria-label*=Menu]"));
  menu.isDisplayed().then(function(isDisplayed) {
    if (isDisplayed) {
      menu.click();
    }

    locator.click();
  });
};

/**
 * Utility to alow the use of a dropdown selector
 * @param  params - array of used values.
 * params[0] - dropdown locator
 * params[1] - option text value
 * params[2] - the panel that pops up ontaining the possible values
 * params[3] - locator to the selected value thats been selected
 */
var useDropdownSelector = function(params) {
  params[0].sendKeys(params[1]);
  this.waitUntilPresent(params[2]);
  params[3].click();
};

/**
 * Expect result is equal to actual value
 * @param {*} actual result
 * @param {*} expected expected result
 */
var expectResultIsEquelTo = function(actual, expected) {
  expect(actual).to.equal(expected);
};

/**
 * Expect result is not equal to actual value
 * @param {*} actual result
 * @param {*} expected expected result
 */
var expectResultIsNotEquelTo = function(actual, expected) {
  expect(actual).to.not.equal(expected);
};

/**
 * Expect each result of an operation should be true
 * @param {*} results
 */
var expectEachResultsIsTrue = function(results) {
  results.forEach(function(result) {
    expectResultIsTrue(result);
  });
};

/**
 * Expect each result of an operation should be false
 * @param {*} results
 */
var expectEachResultsIsFalse = function(results) {
  results.forEach(function(result) {
    expectResultIsFalse(result);
  });
};


/**
 * Expect each result of an operation should be null
 * @param {*} elements
 */
var expectEachResultsIsNull = function(results) {
  results.forEach(function(result) {
    expectResultIsNull(result);
  });
};

/**
 * Expect result to be true
 * @param {*} result
 */
var expectResultIsTrue = function(result) {
  expect(result).to.be.true;
};

/**
 * Expect result to be false
 * @param {*} result
 */
var expectResultIsFalse = function(result) {
  expect(result).to.be.false;
};

/**
 * Expect result to be null
 * @param {*} result
 */
var expectResultIsNull = function(result) {
  expect(result).to.be.null;
};

/**
 * Return promises from operation call on an each element
 * @param {*} elements to iterate through
 * @param {*} elemCallFunc to be called on each element
 */
var returnAllPromises = function(elements, elemCallFunc) {
  elemCallFunc = elemCallFunc || function(x) {
    return x;
  };
  var promises = _.map(elements, elemCallFunc);
  return Promise.all(promises);
};

var pressButton = function(button) {
  return button.isPresent().then(function(result) {
    expectResultIsTrue(result);
    button.click();
  }).then(function() {
    return button.isPresent();
  }).then(function(result) {
    expectResultIsFalse(result);
  });
};

module.exports = {
  checkValuesAreCorrect,
  checkListSize,
  checkElementVisibilityAndValue,
  checkElementsArePresent,

  expectResultIsTrue,
  expectResultIsFalse,
  expectResultIsNull,

  expectResultIsEquelTo,
  expectResultIsNotEquelTo,

  expectEachResultsIsTrue,
  expectEachResultsIsFalse,
  expectEachResultsIsNull,

  navigateToSection,

  returnAllPromises,

  waitPresent,
  waitUntilPresent,
  waitNotPresent,
  waitUntilClickable,

  useDropdownSelector,

  pressButton
};
