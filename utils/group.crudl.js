var cgp = require('../pages/group/create.po');
var mgp = require('../pages/group/main.po');
var utils = require('../utils/utils');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports.create = function(params, dummyParams) {
  var _dummyParams = dummyParams || false;
  mgp.commands.sideClick();
  mgp.commands.selfCheck();
  utils.waitPresent(mgp.selectors.newButton);
  $(mgp.selectors.newButton).click();
  cgp.commands.selfCheck();

  if (!_dummyParams) {
    selectDropdowns(params);
    cgp.commands.fillInTheFields(params);
  }
  $(cgp.selectors.groupForm.createButton).click();
  if (!_dummyParams) {
    utils.waitPresent(mgp.selectors.summaryInfo);
  }
};

var selectDropdowns = function(params) {
  expect($('#assignee').isPresent()).eventually.to.be.true;
  $('#assignee').click(); // BUG why this is assignee?
  utils.waitClickable('.md-select-menu-container.md-active');
  var role = element(by.xpath('//md-select-menu/md-content/md-option/div[starts-with(text(),"' + params.role + '")]'));
  expect(role.isPresent()).eventually.to.be.true;
  role.click();
};

module.exports.update = function(name, params) {
  open({ name: name });
  expect($(mgp.selectors.editButton).isPresent()).eventually.to.be.true;
  $(mgp.selectors.editButton).click();
  //cwp.commands.selfCheck(); TODO need ID of group
  cgp.commands.clearValues();
  selectDropdowns(params);
  cgp.commands.fillInTheFields(params);
  $(cgp.selectors.groupForm.updateButton).click();
};

var open = function(params) {
  mgp.commands.sideClick();
  mgp.commands.selfCheck();
  expect(element(by.xpath('//group-list/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.name + '")]')).isPresent()).eventually.to.be.true;
  element(by.xpath('//group-list/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.name + '")]')).click();
};
module.exports.open = open;

module.exports.remove = function(params) {
  open(params);
  expect($(mgp.selectors.deleteButton).isPresent()).eventually.to.be.true;
  $(mgp.selectors.deleteButton).click();
  expect($(mgp.selectors.proceedButton).isPresent()).eventually.to.be.true;
  $(mgp.selectors.proceedButton).click();
  expect($(mgp.selectors.proceedButton).isPresent()).eventually.to.be.false;
};

module.exports.verifyDetails = function(params) {
  expect(
    element(by.xpath('//group/md-list/md-list-item/div[contains(p,"Group name")]/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//group/md-list/md-list-item/div[contains(p,"Role")]/h3[contains(text(),"' + params.role.toLowerCase() + '")]')).isPresent())
    .eventually.to.be.true;
};

module.exports.verifyInList = function(params) {
  expect(
    element(by.xpath('//group-list/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.true;
};

module.exports.verifyNotInList = function(params) {
  expect(
    element(by.xpath('//group-list/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.false;
};

module.exports.verifyWorkerInList = function(params) {
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

module.exports.verifyWorkerNotInList = function(params) {
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

