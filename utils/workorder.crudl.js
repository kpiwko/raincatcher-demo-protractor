var cwp = require('../pages/workorder/create.po');
var mwp = require('../pages/workorder/main.po');
var utils = require('../utils/utils');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports.create = function(params, dummyParams) {
  var _dummyParams = dummyParams || false;
  mwp.commands.sideClick();
  utils.waitPresent(mwp.selectors.newButton);
  $(mwp.selectors.newButton).click();
  cwp.commands.selfCheck();
  if (!_dummyParams) {
    selectDropdowns(params);
    cwp.commands.fillInTheFields(params);
  }
  $(cwp.selectors.workorderForm.createButton).click();
  // if (!_dummyParams) {
  //   utils.waitPresent(mwp.selectors.summaryInfo); //RAINCATCH-641
  // }
};

module.exports.update = function(title, params) {
  open({ title: title });
  expect($(mwp.selectors.editButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.editButton).click();
  // cwp.commands.selfCheck(); TOOD need ID of workorder /workorders/list/workorder/ryA2nIaie/edit
  selectDropdowns(params);
  cwp.commands.clearValues();
  cwp.commands.fillInTheFields(params);
  // $(cwp.selectors.workorderForm.updateButton).click(); //TODO button should be Update not Create
  $(cwp.selectors.workorderForm.createButton).click();
};

var open = function(params) {
  mwp.commands.sideClick();
  mwp.commands.selfCheck();
  expect(element(by.xpath('//workorder-list/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.true;
  element(by.xpath('//workorder-list/md-list/md-list-item/button/div/div/h3[contains(text(),"' + params.title + '")]')).click();
};

module.exports.open = open;

var selectDropdowns = function(params) {
  // TODO workorder type is default now
  // expect($('#workorderType')).isPresent().eventually.to.be.true;
  // chose workflow type
  expect($('#workflow').isPresent()).eventually.to.be.true;
  $('#workflow').click();
  utils.waitClickable('.md-select-menu-container.md-active');
  var workflow = element(by.xpath("//md-select-menu/md-content/md-option/div[contains(text(),'- " + params.workflow + "')]"));
  expect(workflow.isPresent()).eventually.to.be.true;
  workflow.click();
  $('#assignee').click();
  utils.waitClickable('.md-select-menu-container.md-active');
  var assignee = element(by.xpath("//md-select-menu/md-content/md-option/div[starts-with(text(),'" + params.assignee + "')]"));
  expect(assignee.isPresent()).eventually.to.be.true;
  assignee.click();
};

module.exports.remove = function(params) {
  open(params);
  expect($(mwp.selectors.deleteButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.deleteButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.proceedButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.false;
};

module.exports.verifyDetails = function(params) {
  expect(
    element(by.xpath('//workorder/md-list/md-list-item/div[contains(p,"Status")]/h3[contains(text(),"' + params.status + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//workorder/md-list/md-list-item[md-icon[text()="place"]]/div/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//workorder/md-list/md-list-item[md-icon[text()="place"]]/div/h3[contains(text(),"' + params.latitude + ', ' + params.longitude + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//workorder/md-list/md-list-item/div[contains(p,"Workorder")]/h3[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//workorder/md-list/md-list-item/div[contains(p,"Finish Date")]/h3[contains(text(),"' + params.finishDate + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//workorder/md-list/md-list-item/div[contains(p,"Finish Time")]/h3[contains(text(),"' + params.finishTime.substring(0, 4) + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//workorder/md-list/md-list-item/div[contains(p,"Asignee")]/h3[contains(text(),"' + params.assignee + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//md-content//workorder[contains(.//span,"Work Summary")]/p[contains(text(),"' + params.summary + '")]')).isPresent())
    .eventually.to.be.true;
};

module.exports.verifyInList = function(params) {
  expect(
    element(by.xpath('//workorder-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/h3[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//workorder-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.true;
};

module.exports.verifyNotInList = function(params) {
  expect(
    element(by.xpath('//workorder-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/h3[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//workorder-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.false;
};
