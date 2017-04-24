var utils = require('../utils/utils');
var _ = require('lodash');

function BaseService(pageObject) {
  this.pageObject = pageObject;
}

//################################################################################
//                                CRUDL FUNCTIONS
//################################################################################
/**
 * Create new item
 * @param {*} item to be created
 * @param {*} dummyParams for dummy item creation
 */
BaseService.prototype.create = function(item, dummyParams) {
  var self = this;
  var pageObject = this.pageObject;
  dummyParams = dummyParams || false;

  pageObject.main.commands.sideClick().then(function() {
    utils.pressButton(pageObject.main.locators.newButton);
  }).then(function() {
    pageObject.new.commands.selfCheck();
    self.expectFieldsPresent();
  }).then(function() {
    if (!dummyParams) {
      self.selectDropdowns(item);
    }
  }).then(function() {
    if (!dummyParams) {
      self.fillInTheFields(item);
    }
    pageObject.new.locators.createButton.click();
  }).then(function() {
    if (!dummyParams) { // TODO RAINCATCH-641
      self.expectElementInfo();
    }
  });
};

/**
 * Update item details with new item
 * @param {*} title of updatee item
 * @param {*} item to be filfilled
 */
BaseService.prototype.update = function(toUpdate, updatee) {
  var self = this;
  var pageObject = this.pageObject;

  self.open(toUpdate).then(function() {
    utils.pressButton(pageObject.main.locators.editButton);
  }).then(function() {
    self.clearAllFields();
  }).then(function() {
    self.selectDropdowns(updatee);
    // TOOD need ID of item /items/list/item/<item-id>/edit
  }).then(function() {
    self.fillInTheFields(updatee);
  }).then(function() {
    // TODO button should be Update not Create
    utils.pressButton(pageObject.new.locators.createButton);
  });
};

/**
 * Open item details
 * @param {*} item to be openned
 */
BaseService.prototype.open = function(item) {
  // var pageObject = this.pageObject;
  // return pageObject.main.commands.sideClick().then(function() {
  //   pageObject.main.commands.selfCheck();
  // }).then(function() {
  //   pageObject.main.locators.items.filter(function(wor) {
  //     return wor.element(pageObject.main.locators.item.title).getText().then(function(text) {
  //       return text === this.title;
  //     }.bind({ title: item.title }));
  //   })
  //   .then(function(filtered) {
  //     filtered[0].click();
  //   });
  // });
  var promise = this.search(item);
  return promise.then(function(found) {
    found.click();
  });
};

/**
 * Remove item from items list
 * @param {*} item ro be removed
 */
BaseService.prototype.remove = function(item) {
  var pageObject = this.pageObject;
  this.open(item).then(function() {
    return pageObject.main.locators.deleteButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    return pageObject.main.locators.deleteButton.click();
  }).then(function() {
    return pageObject.main.locators.proceedButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    pageObject.main.locators.proceedButton.click();
  }).then(function() {
    return pageObject.main.locators.proceedButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsFalse(result);
  });
};
//################################################################################
//                                SEARCH FUNCTIONS
//################################################################################
/**
 * Search for specific item
 * @param {*} item to be searched
 * @param {*} count of same items
 */
BaseService.prototype.search = function(item, count) {
  var self = this;
  var pageObject = this.pageObject;

  return pageObject.main.commands.sideClick().then(function() {
    return pageObject.main.commands.selfCheck();
  }).then(function() {
    self.searchForItem(item, count);
  }).then(function() {
    return pageObject.main.commands.firstInTheList();
  });
};

BaseService.prototype.searchReset = function() {
  var pageObject = this.pageObject;
  return pageObject.main.commands.sideClick().then(function() {
    return pageObject.main.commands.selfCheck();
  }).then(function() {
    pageObject.main.locators.search.clear();
  });
};
//################################################################################
//                                FIELDS FUNCTIONS
//################################################################################
/**
 * Clear all Fields of item Form
 */
BaseService.prototype.clearAllFields = function() {
  var clear = function(x) {
    return x.clear();
  };
  var pageObject = this.pageObject;
  pageObject.new.locators.itemForm.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(pageObject.new.locators.fields, clear);
  }).then(function(results) { // clear fields
    utils.expectEachResultsIsNull(results);
  }).then(function() { // clear date and time
    pageObject.new.commands.clearStartDate();
    pageObject.new.commands.clearStartTime();
    pageObject.new.commands.clearFinishDate();
    pageObject.new.commands.clearFinishTime();
  });
};
//################################################################################
//                                EXPECT FUNCTIONS
//################################################################################
/**
 * Check all warnings of item Form are present
 */
BaseService.prototype.expectWarningsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  var pageObject = this.pageObject;
  isPresent(pageObject.new.locators.itemForm).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(pageObject.new.locators.warnings, isPresent);
  }).then(function(results) {
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Check actual element details are equal to expected
 * @param {*} promise element
 * @param {*} expected item details to match
 */
BaseService.prototype.expectElementDetailsEqualTo = function(promise, expected) {
  this.expectElementDetails(promise, expected, utils.expectResultIsEquelTo);
};

/**
 * Check actual element details not equal to expected
 * @param {*} promise element
 * @param {*} expected item details to match
 */
BaseService.prototype.expectElementDetailsNotEqualTo = function(promise, expected) {
  this.expectElementDetails(promise, expected, utils.expectResultIsNotEquelTo);
};

/**
 * Expect item in items list
 * @param {*} item
 */
BaseService.prototype.expectToBeInList = function(expected) {
  var promise = this.search(expected);
  this.expectElementDetails(promise, expected, utils.expectResultIsEquelTo);
};

/**
 * Expect item not in items list
 * @param {*} item
 */
BaseService.prototype.expectNotInTheList = function(expected) {
  var pageObject = this.pageObject;
  pageObject.main.commands.search(expected.title).then(function() {
    pageObject.main.commands.count().then(function(count) {
      utils.expectResultIsEquelTo(count, 0);
    });
  });
};

//################################################################################
//                                BUTTON FUNCTIONS
//################################################################################
/**
 * Press delete button
 * TODO delete button is still present when pressed
 */
BaseService.prototype.pressDeleteButton = function() {
  var pageObject = this.pageObject;
  return pageObject.main.locators.deleteButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    pageObject.main.locators.deleteButton.click();
  }).then(function() {
    return pageObject.main.locators.deleteButton.isPresent();
  }).then(function(/*result*/) { // BUG delete button should not be visible
    // utils.expectResultIsFalse(result);
  });
};

/**
 * Press cancel button
 */
BaseService.prototype.pressCancelButton = function() {
  var pageObject = this.pageObject;
  utils.pressButton(pageObject.main.locators.cancelButton);
};

/**
 * Press new button
 */
BaseService.prototype.pressNewButton = function() {
  var pageObject = this.pageObject;
  utils.pressButton(pageObject.main.locators.newButton);
};

/**
 * Press Cancel button on new item page
 */
BaseService.prototype.pressNewCancelButton = function() {
  var pageObject = this.pageObject;
  utils.pressButton(pageObject.new.locators.cancelButton);
};

/**
 * Prese edit button
 */
BaseService.prototype.pressEditButton = function() {
  var pageObject = this.pageObject;
  utils.pressButton(pageObject.main.locators.editButton);
};

/**
 * Expect New button is present on page
 */
BaseService.prototype.expectNewButtonIsPresent = function() {
  var pageObject = this.pageObject;
  return pageObject.main.locators.newButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
  });
};

//################################################################################
//                                OVERRIDDEN FUNCTIONS
//################################################################################
/**
 * Select dropdowns from item form
 * @param {*} item details to be selected
 */
BaseService.prototype.selectDropdowns = function(item) {
  _.noop(item);
  throw new Error('Override this method in super class');
};

/**
 * FIll item details into fields
 * @param {*} item to be created
 */
BaseService.prototype.fillInTheFields = function(item) {
  _.noop(item);
  throw new Error('Override this method in super class');
};

/**
 * Search item in items list
 * @param {*} item to be searched
 */
BaseService.prototype.searchForItem = function(item, count) {
  _.noop(item, count);
  throw new Error('Override this method in super class');
};

/**
 * Check if all fields of item Form are present
 */
BaseService.prototype.expectFieldsPresent = function() {
  throw new Error('Override this method in super class');
};

/**
 * Compare actual item details with expected
 * @param {*} item to be compared to
 */
BaseService.prototype.expectDetailsToBe = function(item) {
  _.noop(item);
  throw new Error('Override this method in super class');
};

BaseService.prototype.expectElementInfo = function() {
  throw new Error('Override this method in super class');
};

/**
 * Compare actual element details with expected by expect function
 * @param {*} promise element
 * @param {*} expected item details to match
 * @param {*} expectFunc function to be called to compare
 */
BaseService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  _.noop(promise, expected, expectFunc);
  throw new Error('Override this method in super class');
};

module.exports = BaseService;