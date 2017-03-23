var cwp = require('../pages/worker/create.po');
var mwp = require('../pages/worker/main.po');
var utils = require('../utils/utils');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports.create = function(params, dummyParams) {
  var _dummyParams = dummyParams || false;
  mwp.commands.sideClick();
  mwp.commands.selfCheck();
  utils.waitPresent(mwp.selectors.newButton);
  $(mwp.selectors.newButton).click();
  cwp.commands.selfCheck();
  cwp.commands.clearValues();
  if (!_dummyParams) {
    expect($(cwp.selectors.workerForm.groupSelector).isPresent()).eventually.to.be.true;
    $(cwp.selectors.workerForm.groupSelector).click();
    utils.waitClickable('.md-select-menu-container.md-active');
    expect(element(by.xpath('//md-select-menu/md-content//div[text()="' + params.group + '"]')).isPresent()).eventually.to.be.true;
    element(by.xpath('//md-select-menu/md-content//div[text()="' + params.group + '"]')).click();
    cwp.commands.fillInTheFields(params);
  }
  $(cwp.selectors.workerForm.createButton).click();
  // if (!_dummyParams) {
  //  utils.waitPresent() implement for XPath selectors
  //  expect(element(by.xpath(mwp.selectors.informationPage)).isPresent()).eventually.to.be.true; //RAINCATCH-641
  // }
};

module.exports.update = function(name, params) {
  open({ name: name });
  expect($(mwp.selectors.editButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.editButton).click();
  // cwp.commands.selfCheck(); TOOD need ID of worker /workers/worker/rkX1fdSH/edit
  // selectDropdowns(params); add select Group for worker
  cwp.commands.clearValues();
  cwp.commands.fillInTheFields(params);
  $(cwp.selectors.workerForm.updateButton).click(); //TODO button should be Update not Create
};

var open = function(params) {
  mwp.commands.sideClick();
  mwp.commands.selfCheck();
  expect(element(by.xpath('//worker-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/h3[contains(text(), "'+ params.name +'")]')).isPresent())
    .eventually.to.be.true;
  element(by.xpath('//worker-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/h3[contains(text(), "'+ params.name +'")]')).click();
};
module.exports.open = open;

module.exports.remove = function(params) {
  open(params);
  expect($(mwp.selectors.deleteButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.deleteButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.proceedButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.false;
};

module.exports.verifyWorkorderInList = function(name, params) {
  open({ name: name });
  mwp.commands.openWorkordersPage();
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/h4[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.true;
};

module.exports.verifyWorkorderNotInList = function(name, params) {
  open({ name: name });
  mwp.commands.openWorkordersPage();
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/h4[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.false;
};

module.exports.verifyInList = function(params) {
  expect(
    element(by.xpath('//worker-list/md-list/md-list-item/button/div/img[contains(@src,"' + params.avatar + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//worker-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//worker-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/p[contains(text(),"' + params.position + '")]')).isPresent())
    .eventually.to.be.true;
};

module.exports.verifyNotInList = function(params) {
  expect(
    element(by.xpath('//worker-list/md-list/md-list-item/button/div/img[contains(@src,"'+ params.avatar +'")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//worker-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/h3[contains(text(),"' + params.name + '")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//worker-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/p[contains(text(),"' + params.position + '")]')).isPresent())
    .eventually.to.be.false;
};