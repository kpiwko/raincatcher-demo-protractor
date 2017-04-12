var nwp = require('../pages/worker/new.po');
var mwp = require('../pages/worker/main.po');
var swp = require('../pages/worker/selected.po');

var utils = require('../utils/utils');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

/**
 * Create new worker
 * @param {*} worker to be created
 * @param {*} dummyParams for dummy worker creation
 */
module.exports.create = function(worker, dummyParams) {
  dummyParams = dummyParams || false;
  mwp.commands.sideClick().then(function() {
    utils.pressButton(mwp.locators.newButton);
  }).then(function() {
    nwp.commands.selfCheck();
  }).then(function() {
    clearAllFields();
  }).then(function() {
    if (!dummyParams) {
      selectDropdowns(worker);
    }
  }).then(function() {
    if (!dummyParams) {
      fillInTheFields(worker);
    }
    nwp.locators.createButton.click();
  }).then(function() {
    if (!dummyParams) {
      //  utils.waitPresent() implement for XPath locators
      swp.locators.informationPage.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
      });
    }
  });
};

/**
 * Update worker details with new worker
 * @param {*} name of updatee worker
 * @param {*} worker to be filfilled
 */
module.exports.update = function(name, worker) {
  open({ name: name }).then(function() {
    utils.pressButton(mwp.locators.editButton);
  }).then(function() {
    clearAllFields();
  }).then(function() {
    selectDropdowns(worker);
    // TOOD need ID of worker /workers/list/worker/ryA2nIaie/edit
  }).then(function() {
    fillInTheFields(worker);
  }).then(function() {
    // utils.pressButton(nwp.locators.updateButton);
    utils.pressButton(nwp.locators.createButton);
  });
};

/**
 * Open worker details
 * @param {*} worker to be openned
 */
var open = function(worker) {
  return mwp.commands.sideClick().then(function() {
    mwp.commands.selfCheck();
  }).then(function() {
    return mwp.locators.workers.filter(function(wrk) {
      return wrk.element(mwp.locators.worker.fullName).getText().then(function(text) {
        return text === this.fullName;
      }.bind({ fullName: worker.name }));
    })
    .then(function(filtered) {
      filtered[0].click();
    });
  });
};
module.exports.open = open;

/**
 * Select dropdowns from worker form
 * @param {*} worker details to be selected
 */
var selectDropdowns = function(worker) {
  var group = element(by.xpath('//md-select-menu/md-content//div[text()="' + worker.group + '"]'));
  nwp.locators.dropdowns.group.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return nwp.locators.dropdowns.group.click();
  }).then(function() {
    return group.isPresent();
  }).then(function(result) {
    utils.expectResultIsTrue(result);
    utils.waitUntilClickable($('.md-select-menu-container.md-active'));
    group.click();
  });
};

module.exports.searchReset = function() {
  return mwp.commands.sideClick().then(function() {
    return mwp.commands.selfCheck();
  }).then(function() {
    mwp.locators.search.clear();
  });
};

module.exports.verifyWorkorderInList = function(name, params) {
  open({ name: name });
  swp.commands.openWorkordersPage();
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/h4[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.true;
};

module.exports.verifyWorkorderNotInList = function(name, params) {
  open({ name: name });
  swp.commands.openWorkordersPage();
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/h4[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.false;
};

/**
 * Check actual element details are equal to expected
 * @param {*} promise element
 * @param {*} expected worker details to match
 */
module.exports.expectElementDetailsEqualTo = function(promise, expected) {
  promise.then(function(elem) {
    mwp.commands.getFullName(elem).then(function(result) {
      utils.expectResultIsEquelTo(result, expected.name);
    });
    mwp.commands.getPosition(elem).then(function(result) {
      utils.expectResultIsEquelTo(result, expected.position);
    });
  });
};

/**
 * Check actual element details not equal to expected
 * @param {*} promise element
 * @param {*} expected worker details to match
 */
module.exports.expectElementDetailsNotEqualTo = function(promise, expected) {
  promise.then(function(elem) {
    mwp.commands.getFullName(elem).then(function(result) {
      utils.expectResultIsNotEquelTo(result, expected.name);
    });
    mwp.commands.getPosition(elem).then(function(result) {
      utils.expectResultIsNotEquelTo(result, expected.position);
    });
  });
};

/**
 * Remove worker from workers list
 * @param {*} worker ro be removed
 */
module.exports.remove = function(worker) {
  open(worker).then(function() {
    pressDeleteButton();
  }).then(function() {
    utils.pressButton(mwp.locators.proceedButton);
  });
};

/**
 * Search for specific worker
 * @param {*} worker to be searched
 * @param {*} count of same workers
 */
// var search = function(worker, count) {
//   count = count || 1;
//   return mwp.commands.sideClick().then(function() {
//     return mwp.commands.selfCheck();
//   }).then(function() {
//     mwp.commands.search(worker.name).then(function() {
//       mwp.commands.count().then(function(c) {
//         utils.expectResultIsEquelTo(c, count);
//       });
//     });
//     return mwp.commands.firstInTheList();
//   });
// };

/**
 * Search for specific worker
 * @param {*} worker to be searched
 */
var searchFix = function(worker) {
  return mwp.commands.sideClick().then(function() {
    mwp.commands.selfCheck();
  }).then(function() {
    return mwp.locators.workers.filter(function(wrk) {
      return wrk.element(mwp.locators.worker.fullName).getText().then(function(text) {
        return text === this.fullName;
      }.bind({ fullName: worker.name }));
    })
    .then(function(filtered) {
      return filtered[0];
    });
  });
};
module.exports.search = searchFix;
/**
 * Expect worker in worker list
 * @param {*} worker
 */
module.exports.expectToBeInList = function(worker) {
  searchFix(worker).then(function(elem) {
    mwp.commands.getFullName(elem).then(function(result) {
      utils.expectResultIsEquelTo(result, worker.name);
    });
    mwp.commands.getPosition(elem).then(function(result) {
      utils.expectResultIsEquelTo(result, worker.position);
    });
  });
};

/**
 * Expect worker not in workers list
 * @param {*} worker
 */
module.exports.expectNotInTheList = function(worker) {
  searchFix(worker).then(function(elem) {
    utils.expectResultIsUndefined(elem);
  });
};
// var expectNotInTheList = function(worker) {
//   mwp.commands.search(worker.title).then(function() {
//     mwp.commands.count().then(function(count) {
//       utils.expectResultIsEquelTo(count, 0);
//     });
//   });
// };

/**
 * Compare actual worker details with expected
 * @param {*} worker to be compared to
 */
module.exports.expectDetailsToBe = function(worker) {
  swp.commands.getDetails()
  .then(function(details) {
    var username = swp.commands.getUsername(details);
    utils.expectResultIsEquelTo(username.h3, worker.username);
    var phoneNumber = swp.commands.getPhoneNumber(details);
    utils.expectResultIsEquelTo(phoneNumber.h3, worker.phonenumber);
    var email = swp.commands.getEmail(details);
    utils.expectResultIsEquelTo(email.h3, worker.email);
    var position = swp.commands.getPosition(details);
    utils.expectResultIsEquelTo(position.h3, worker.position);
    var group = swp.commands.getGroup(details);
    utils.expectResultIsEquelTo(group.h3, worker.group);
    // swp.commands.getNotes() TODO add notes check
    // .then(function(notes) {
    //   utils.expectResultIsEquelTo(notes, worker.notes);
    // });
  });
};

/**
 * Clear all fields of Worker Form
 */
var clearAllFields = function() {
  var clear = function(x) {
    return x.clear();
  };
  nwp.locators.workerForm.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.fields, clear);
  }).then(function(results) { // clear fields
    utils.expectEachResultsIsNull(results);
  }).then(function() { // clear date and time
    // nwp.commands.clearFinishDate();
    // nwp.commands.clearFinishTime();
  });
};

/**
 * Check if all fields of Worker Form are present
 */
module.exports.expectFieldsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  isPresent(nwp.locators.workerForm).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.fields, isPresent);
  }).then(function(results) { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(nwp.locators.dropdowns, isPresent);
  }).then(function(results) { // dropdowns present
    utils.expectEachResultsIsTrue(results);
    // return utils.returnAllPromises(nwp.locators.finish, isPresent);
  // }).then(function(results) { // date and time present
    // utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Check all warnings of Worker Form are present
 */
module.exports.expectWarningsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  isPresent(nwp.locators.workerForm).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(nwp.locators.warnings, isPresent);
  }).then(function(results) {
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Fill worker details into fields
 * @param {*} worker to be created
 */
var fillInTheFields = function(worker) {
  nwp.locators.workerForm.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    nwp.commands.enterName(worker.name);
  }).then(function() {
    nwp.commands.enterUsername(worker.username);
  }).then(function() {
    nwp.commands.enterPassword(worker.password);
  }).then(function() {
    nwp.commands.enterBanner(worker.banner);
  }).then(function() {
    nwp.commands.enterAvatar(worker.avatar);
  }).then(function() {
    nwp.commands.enterPhone(worker.phonenumber);
  }).then(function() {
    nwp.commands.enterEmail(worker.email);
  }).then(function() {
    nwp.commands.enterPosition(worker.position);
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
module.exports.pressDeleteButton = pressDeleteButton;

/**
 * Press cancel button
 */
module.exports.pressCancelButton = function() {
  utils.pressButton(mwp.locators.cancelButton);
};

/**
 * Press new button
 */
module.exports.pressNewButton = function() {
  utils.pressButton(mwp.locators.newButton);
};

/**
 * Press Cancel button on new worker page
 */
module.exports.pressNewCancelButton = function() {
  utils.pressButton(nwp.locators.cancelButton);
};

/**
 * Prese edit button
 */
module.exports.pressEditButton = function() {
  utils.pressButton(mwp.locators.editButton);
};

/**
 * Expect New button is present on page
 */
module.exports.expectNewButtonIsPresent = function() {
  return mwp.locators.newButton.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
  });
};