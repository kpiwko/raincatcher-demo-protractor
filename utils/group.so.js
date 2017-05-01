var pageObject = require('../pages/group');

var ngp = pageObject.new;
var mgp = pageObject.main;
var sgp = pageObject.selected;

var utils = require('../utils/utils');
var BaseService = require('../utils/base.so');

var _ = require('lodash');

function GroupService() {
  pageObject.new.locators.itemForm = pageObject.new.locators.groupForm;
  BaseService.call(this, pageObject);
}

utils.inherit(GroupService, BaseService);

/**
 * Select dropdowns from group form
 * @param {*} group details to be selected
 */
GroupService.prototype.selectDropdowns = _.noop;
// GroupService.prototype.selectDropdowns = function(group) {
//   var role = element(by.xpath('//md-select-menu/md-content/md-option/div[starts-with(text(),"' + group.role + '")]'));
//   var clickable = element(by.css('.md-select-menu-container.md-active'));

//   ngp.locators.dropdowns.role.isPresent().then(function(result) {
//     utils.expectEachResultsIsTrue(result);
//     ngp.locators.dropdowns.role.click();
//   }).then(function() {
//     return role.isPresent();
//   }).then(function(result) {
//     utils.expectResultIsTrue(result);
//     utils.waitClickable(clickable);
//     role.click();
//   });
// };

/**
 * Fill group details into fields
 * @param {*} group to be created
 */
GroupService.prototype.fillInTheFields = function(group) {
  ngp.locators.groupForm.isPresent().then(function(result) {
    utils.expectResultIsTrue(result);
    ngp.commands.enterName(group.name);
  }).then(function() {
    ngp.commands.enterRole(group.role);
  });
};

/**
 * Clear specific fields on Group Form
 */
GroupService.prototype.clearOtherFields = _.noop;
/**
 * Search workorder in groups list
 * @param {*} group to be searched
 */
GroupService.prototype.searchForItem = function(group, count) {
  return pageObject.main.commands.search(group.name).then(function() {
    pageObject.main.commands.count().then(function(c) {
      utils.expectResultIsEquelTo(c, count);
    });
  });
};

/**
 * Check if all fields of Workorder Form are present
 */
GroupService.prototype.expectFieldsPresent = function() {
  var isPresent = function(x) {
    return x.isPresent();
  };
  isPresent(ngp.locators.groupForm).then(function(result) {
    utils.expectResultIsTrue(result);
    return utils.returnAllPromises(ngp.locators.fields, isPresent);
  }).then(function(results) { // fields present
    utils.expectEachResultsIsTrue(results);
    return utils.returnAllPromises(ngp.locators.dropdowns, isPresent);
  }).then(function(results) { // dropdowns present
    utils.expectEachResultsIsTrue(results);
  });
};

/**
 * Compare actual group details with expected
 * @param {*} group to be compared to
 */
GroupService.prototype.expectDetailsToBe = function(group) {
  sgp.commands.getDetails()
  .then(function(details) {
    var name = sgp.commands.getName(details);
    utils.expectResultIsEquelTo(name.h3, group.name);
    var role = sgp.commands.getRole(details, group.role);
    utils.expectResultIsEquelTo(role.h3, role);
    // sgp.commands.getMembers() // TODO implement members check
    // .then(function(members) {
    //   utils.expectResultIsEquelTo(members, group.members);
    // });
  });
};

GroupService.prototype.expectElementInfo = function() {
  console.log('RAINCATCH-793: need to implement Group functionality');
  // mwp.locators.summaryInfo.isPresent().then(function(result) {
  //   utils.expectEachResultsIsTrue(result);
  // });
};

GroupService.prototype.expectElementDetails = function(promise, expected, expectFunc) {
  promise.then(function(elem) {
    mgp.commands.getName(elem).then(function(result) {
      expectFunc(result, expected.name);
    });
  });
};

GroupService.prototype.verifyWorkerInList = function(params) {
  expect(
    element(by.xpath('//group/md-toolbar/div/h3[contains(text(),"Members")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//group/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//group/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.position + '")]')).isPresent())
    .eventually.to.be.true;
};

GroupService.prototype.verifyWorkerNotInList = function(params) {
  expect(
    element(by.xpath('//group/md-toolbar/div/h3[contains(text(),"Members")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//group/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//group/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.position + '")]')).isPresent())
    .eventually.to.be.false;
};

module.exports = GroupService;