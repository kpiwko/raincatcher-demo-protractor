var cwp = require('../pages/worker/create.po');
var mwp = require('../pages/worker/main.po');
var utils = require('../utils/utils');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports.create = function(params) {
  mwp.commands.sideClick();
  utils.waitPresent(mwp.selectors.newButton);
  $(mwp.selectors.newButton).click();
  cwp.commands.clearValues();
  expect($('#group').isPresent()).eventually.to.be.true;
  $('#group').click();
  utils.waitClickable('.md-select-menu-container.md-active');
  expect(element(by.xpath('//md-select-menu/md-content//div[text()="' + params.group + '"]')).isPresent()).eventually.to.be.true;
  element(by.xpath('//md-select-menu/md-content//div[text()="' + params.group + '"]')).click();
  cwp.commands.fillInTheFields(params);
  $(cwp.selectors.workerForm.createButton).click();
  //expect(element(by.xpath(mwp.selectors.informationPage)).isPresent()).eventually.to.be.true; //RAINCATCH-641
};

var open = function(name) {
  mwp.commands.sideClick();
  mwp.commands.selfCheck();
  expect(element(by.xpath('//worker-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/h3[contains(text(), "'+ name +'")]')).isPresent())
    .eventually.to.be.true;
  element(by.xpath('//worker-list/md-list/md-list-item/button/div/div[@class="md-list-item-text"]/h3[contains(text(), "'+ name +'")]')).click();
};
module.exports.open = open;

module.exports.remove = function(name) {
  open(name);
  expect($(mwp.selectors.deleteButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.deleteButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.proceedButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.false;
};

module.exports.verifyWorkorderInList = function(params) {
  mwp.commands.openWorkordersPage();
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/h4[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.true;
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.true;
};

module.exports.verifyWorkorderNotInList = function(params) {
  mwp.commands.openWorkordersPage();
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/h4[contains(text(),"' + params.title + '")]')).isPresent())
    .eventually.to.be.false;
  expect(
    element(by.xpath('//md-tab-content/div/md-content/md-list/md-list-item/button/div/div/p[contains(text(),"' + params.address + '")]')).isPresent())
    .eventually.to.be.false;
};