var cwp = require('../pages/workflow/create.po');
var mwp = require('../pages/workflow/main.po');
var utils = require('../utils/utils');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports.create = function(params) {
  mwp.commands.sideClick();
  mwp.commands.selfCheck();
  utils.waitPresent(mwp.selectors.newButton);
  $(mwp.selectors.newButton).click();
  cwp.commands.selfCheck();
  cwp.commands.fillInTheFields(params);
  $(cwp.selectors.workflowForm.createButton).click();
  utils.waitPresent(mwp.selectors.stepForm.self);
};

module.exports.update = function(title, params) {
  open({title: title});
  expect($(mwp.selectors.editButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.editButton).click();
  //cwp.commands.selfCheck(); TODO need ID of workflow
  cwp.commands.clearValues();
  cwp.commands.fillInTheFields(params);
  $(cwp.selectors.workflowForm.updateButton).click();
};

var open = function(title) {
  mwp.commands.sideClick();
  mwp.commands.selfCheck();
  expect(element(by.xpath('//workflow-list/md-list/md-list-item/button/div/div/p[contains(text(),"' + title + '")]')).isPresent()).eventually.to.be.true;
  element(by.xpath('//workflow-list/md-list/md-list-item/button/div/div/p[contains(text(),"' + title + '")]')).click();
};
module.exports.open = open;

module.exports.remove = function(title) {
  open(title);
  expect($(mwp.selectors.deleteButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.deleteButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.true;
  $(mwp.selectors.proceedButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.false;
};
