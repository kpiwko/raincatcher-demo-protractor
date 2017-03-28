// var cwp = require('../pages/workflow/create.po');
var mwp = require('../pages/workflow/main.po');
// var utils = require('../utils/utils');
var workflowCrudl = require('./workflow.crudl');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var addStep = function(params) {
  mwp.commands.fillInTheStepFields(params);
  $(mwp.selectors.stepForm.addStepButton).click();
};

module.exports.addStep = addStep;

module.exports.addStepToWorkflow = function(workflow, params) {
  workflowCrudl.open({title: workflow});
  addStep(params);
};

module.exports.remove = function(params) {
  //var elemToRemove = by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-actions/button[@aria-label="Delete Step"]');
  var elemToRemove = by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-actions/button[@aria-label="Delete Step"]');
  expect(
    element(elemToRemove).isPresent()
  ).eventually.to.be.true;

  element(elemToRemove).click();

  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.true;
  // browser.sleep(1000); // wait for animation
  $(mwp.selectors.proceedButton).click();
  expect($(mwp.selectors.proceedButton).isPresent()).eventually.to.be.false;
};

module.exports.update = function(name, params) {
  //var elemToEdit = by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + name + '")]]/md-card-actions/button[@aria-label="Edit Step"]');
  var elemToEdit = by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + name + '")]]/md-card-actions/a[@aria-label="Edit Step"]');
  expect(
    element(elemToEdit).isPresent()
  ).eventually.to.be.true;

  element(elemToEdit).click();
  // browser.sleep(1000); // wait for animation
  mwp.commands.clearStepValues();
  mwp.commands.fillInTheStepFields(params);
  $(mwp.selectors.stepForm.updateStepButton).click();
};

module.exports.verifyDetails = function(params) {
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]')).isPresent()
  // ).eventually.to.be.true;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]')).isPresent()
  ).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "Step code")]/../h3[contains(text(), "' + params.code + '")]')).isPresent()
  // ).eventually.to.be.true;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "Step code")]/../h3[contains(text(), "' + params.code + '")]')).isPresent()
  ).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "FormId")]/../h3[contains(text(), "' + params.formId + '")]')).isPresent()
  // ).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "View template")]/../h3[contains(text(), "' + params.view + '")]')).isPresent()
  // ).eventually.to.be.true;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "View template")]/../h3[contains(text(), "' + params.view + '")]')).isPresent()
  ).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "Form temlate")]/../h3[contains(text(), "' + params.form + '")]')).isPresent()
  // ).eventually.to.be.true;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]/md-card-content/workflow-step-detail/md-list/md-list-item/div/p[contains(text(), "Form template")]/../h3[contains(text(), "' + params.form + '")]')).isPresent()
  ).eventually.to.be.true;
};

module.exports.verifyIsNotInTheList = function(params) {
  expect($('#stepList').isPresent()).eventually.to.be.true;
  // expect(
  //   element(by.xpath('//workflow-detail/div/div/md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]')).isPresent()
  // ).eventually.to.be.false;
  expect(
    element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + params.name + '")]]')).isPresent()
  ).eventually.to.be.false;

};