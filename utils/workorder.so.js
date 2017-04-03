var nwp = require('../pages/workorder/new.po');
var mwp = require('../pages/workorder/main.po');
var swp = require('../pages/workorder/selected.po');
var utils = require('../utils/utils');

/**
 * Create new workorder
 * @param {*} workorder to be created
 * @param {*} dummyParams for dummy workorder creation
 */
var create = function(workorder, dummyParams) {
  dummyParams = dummyParams || false;
  mwp.commands.sideClick().then(function() {
    return mwp.locators.newButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    mwp.locators.newButton.click();
  }).then(function() {
    nwp.commands.selfCheck();
  }).then(function() {
    if (!dummyParams) {
      selectDropdowns(workorder);
    }
  }).then(function() {
    if (!dummyParams) {
      fillInTheFields(workorder);
    }
    nwp.locators.createButton.click();
  }).then(function() {
    // if (!dummyParams) {
    //   utils.waitPresent(mwp.selectors.summaryInfo); //RAINCATCH-641
    // }
  });
};

/**
 * Update workorder details with new workorder
 * @param {*} title of updatee workorder
 * @param {*} workorder to be filfilled
 */
var update = function(title, workorder) {
  open({ title: title }).then(function() {
    return mwp.locators.editButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    return mwp.locators.editButton.click();
  }).then(function() {
    clearAllFields();
  }).then(function() {
    selectDropdowns(workorder);
    // TOOD need ID of workorder /workorders/list/workorder/ryA2nIaie/edit
  }).then(function() {
    fillInTheFields(workorder);
  }).then(function() {
    //TODO button should be Update not Create
    nwp.locators.createButton.click();
  });
};

/**
 * Open workorder details
 * @param {*} workorder to be openned
 */
var open = function(workorder) {
  return mwp.commands.sideClick().then(function() {
    mwp.commands.selfCheck();
  }).then(function() {
    mwp.locators.workorders.filter(function(wor) {
      return wor.element(mwp.locators.workorder.title).getText().then(function(text) {
        return text === this.title;
      }.bind({ title: workorder.title }));
    })
    .then(function(filtered) {
      filtered[0].click();
    });
  });
};

/**
 * Select dropdowns from workorder form
 * @param {*} workorder details to be selected
 */
var selectDropdowns = function(workorder) {
  // TODO workorder type is default now
  // expect($('#workorderType')).isPresent().eventually.to.be.true;
  var workflow = element(by.xpath("//md-select-menu/md-content/md-option/div[contains(text(),'- " + workorder.workflow + "')]"));
  var assignee = element(by.xpath("//md-select-menu/md-content/md-option/div[starts-with(text(),'" + workorder.assignee + "')]"));
  var clickable = element(by.css('.md-select-menu-container.md-active'));

  nwp.locators.dropdowns.workflow.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    nwp.locators.dropdowns.workflow.click();
  }).then(function() {
    return workflow.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    utils.waitUntilClickable(clickable);
    workflow.click();
  }).then(function() {
    return nwp.locators.dropdowns.assignee.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    nwp.locators.dropdowns.assignee.click();
  }).then(function() {
    return assignee.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    utils.waitUntilClickable(clickable);
    assignee.click();
  });
};

/**
 * FIll workorder details into fields
 * @param {*} workorder to be created
 */
var fillInTheFields = function(workorder) {
  nwp.locators.workorderForm.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    nwp.commands.enterTitle(workorder.title);
  }).then(function() {
    nwp.commands.enterAddress(workorder.address);
  }).then(function() {
    nwp.commands.enterLatitute(workorder.latitude);
  }).then(function() {
    nwp.commands.enterLongitude(workorder.longitude);
  }).then(function() {
    nwp.commands.enterFinishDate(workorder.finishDate);
  }).then(function() {
    nwp.commands.enterFinishTime(workorder.finishTime);
  }).then(function() {
    nwp.commands.enterSummary(workorder.summary);
  });
};

/**
 * Remove workorder from workorders list
 * @param {*} workorder ro be removed
 */
var remove = function(workorder) {
  open(workorder).then(function() {
    return mwp.locators.deleteButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    return mwp.locators.deleteButton.click();
  }).then(function() {
    return mwp.locators.proceedButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    mwp.locators.proceedButton.click();
  }).then(function() {
    return mwp.locators.proceedButton.isPresent();
  }).then(function(result) {
    utils.expectResultIsFalse(result);
  });
};

/**
 * Compare actual workorder details with expected
 * @param {*} workorder to be compared to
 */
var expectDetailsToBe = function(workorder) {
  swp.commands.getDetails()
  .then(function(details) {
    var status = swp.commands.getStatus(details);
    utils.expectResultIsEquelTo(status.h3, workorder.status);
    var coordinates = swp.commands.getCoordinates(details, workorder.address);
    utils.expectResultIsEquelTo(coordinates.h3, workorder.latitude+', '+workorder.longitude);
    var title = swp.commands.getTitle(details);
    utils.expectResultIsEquelTo(title.h3, workorder.title);
    // var finishDate = swp.commands.getFinishDate(details); //  TODO check date format
    // utils.checkResultIsEquelTo(finishDate.h3, params.finishDate);
    var finishTime = swp.commands.getFinishTime(details);
    utils.expectResultIsEquelTo(finishTime.h3.substring(0, 5), workorder.finishTime.substring(0, 5));
    var assignee = swp.commands.getAssignee(details);
    utils.expectResultIsEquelTo(assignee.h3, workorder.assignee);
    swp.commands.getSummary()
    .then(function(summary) {
      utils.expectResultIsEquelTo(summary, workorder.summary);
    });
    swp.commands.getWorkflow()
    .then(function(workflow) {
      utils.expectResultIsEquelTo(workflow, 'Workflow: ' + workorder.workflow);
    });
  });
};

/**
 * Search for specific workorder
 * @param {*} workorder to be searched
 * @param {*} count of same workorders
 */
var search = function(workorder, count) {
  count = count || 1;
  return mwp.commands.sideClick().then(function() {
    return mwp.commands.selfCheck();
  }).then(function() {
    mwp.commands.search(workorder.title).then(function() {
      mwp.commands.count().then(function(c) {
        utils.expectResultIsEquelTo(c, count);
      });
    });
    return mwp.commands.firstInTheList();
  });
};

var searchReset = function() {
  return mwp.commands.sideClick().then(function() {
    return mwp.commands.selfCheck();
  }).then(function() {
    mwp.locators.search.clear();
  });
};

/**
 * Check actual element details are equal to expected
 * @param {*} promise element
 * @param {*} expected workorder details to match
 */
var verifyElementDetailsEqualTo = function(promise, params) {
  promise.then(function(elem) {
    mwp.commands.getTitle(elem).then(function(result) {
      utils.expectResultIsEquelTo(result, params.title);
    });
    mwp.commands.getAddress(elem).then(function(result) {
      utils.expectResultIsEquelTo(result, params.address);
    });
  });
};

/**
 * Check actual element details not equal to expected
 * @param {*} promise element
 * @param {*} expected workorder details to match
 */
var verifyElementDetailsNotEqualTo = function(promise, expected) {
  promise.then(function(elem) {
    mwp.commands.getTitle(elem).then(function(result) {
      utils.expectResultIsNotEquelTo(result, expected.title);
    });
    mwp.commands.getAddress(elem).then(function(result) {
      utils.expectResultIsNotEquelTo(result, expected.address);
    });
  });
};

/**
 * Expect workorder in workorder list
 * @param {*} workorder
 */
var expectToBeInList = function(workorder) {
  search(workorder).then(function(elem) {
    mwp.commands.getTitle(elem).then(function(result) {
      utils.expectResultIsEquelTo(result, workorder.title);
    });
    mwp.commands.getAddress(elem).then(function(result) {
      utils.expectResultIsEquelTo(result, workorder.address);
    });
  });
};

/**
 * Expect workorder not in workorder list
 * @param {*} workorder
 */
var expectNotInTheList = function(workorder) {
  mwp.commands.search(workorder.title).then(function() {
    mwp.commands.count().then(function(count) {
      utils.expectResultIsEquelTo(count, 0);
    });
  });
};

/**
 * Clear all Fields of Workorder Form
 */
var clearAllFields = function() {
  var clear = function(x) {
    return x.clear();
  };
  nwp.locators.workorderForm.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.fields, clear);
  }).then(function(results) { // clear fields
    utils.expectEachResultsIsNull(results);
  }).then(function() { // clear date and time
    nwp.commands.clearFinishDate();
    nwp.commands.clearFinishTime();
  });
};

/**
 * Check if all fields of Workorder Form are present
 */
var expectFieldsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  isPresent(nwp.locators.workorderForm).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.fields, isPresent);
  }).then(function(results) { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.dropdowns, isPresent);
  }).then(function(results) { // dropdowns present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.finish, isPresent);
  }).then(function(results) { // date and time present
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Check all warnings of Workorder Form are present
 */
var expectWarningsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  isPresent(nwp.locators.workorderForm).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.warnings, isPresent);
  }).then(function(results) {
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Press delete button
 * TODO delete button is still present when pressed
 */
var pressDeleteButton = function() {
  return mwp.locators.deleteButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    mwp.locators.deleteButton.click();
  }).then(function() {
    return mwp.locators.deleteButton.isPresent();
  }).then(function(/*result*/) { // BUG delete button should not be visible
    // utils.expectResultIsFalse(result);
  });
};

/**
 * Press cancel button
 */
var pressCancelButton = function() {
  utils.pressButton(mwp.locators.cancelButton);
};

/**
 * Press new button
 */
var pressNewButton = function() {
  utils.pressButton(mwp.locators.newButton);
};

/**
 * Press Cancel button on new workorderpage
 */
var pressNewCancelButton = function() {
  utils.pressButton(nwp.locators.cancelButton);
};

/**
 * Prese edit button
 */
var pressEditButton = function() {
  utils.pressButton(mwp.locators.editButton);
};

/**
 * Expect New button is present on page
 */
var expectNewButtonIsPresent = function() {
  return mwp.locators.newButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
  });
};

module.exports = {
  create, open, update, remove, search, searchReset,
  expectWarningsPresent, expectFieldsPresent,
  expectDetailsToBe, verifyElementDetailsEqualTo, verifyElementDetailsNotEqualTo,
  expectToBeInList, expectNotInTheList,
  pressDeleteButton, pressCancelButton, pressNewButton, pressNewCancelButton,
  expectNewButtonIsPresent, pressEditButton
};