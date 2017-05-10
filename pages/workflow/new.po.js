var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var NewWorkflowPage = function() {
  var workflowFormSelector = 'form[name="workflowForm"]';
  var locators = {
    workflowForm: element(by.css(workflowFormSelector)),
    fields : {
      title: element(by.css(workflowFormSelector + ' #title')),
    },
    dropdowns: {
      // no dropdowns on this page
    },
    warnings: {
      invalidTitle: element(by.css('#title[aria-invalid="true"]'))
    },
    createButton: element(by.css('button[aria-label="Create Workflow"]')),
    updateButton: element(by.css('button[aria-label="Update Workflow"]')),
    // cancelButton: element(by.css('button[aria-label="Close"]')) // BUG button with same CSS is available after closing page
    cancelButton: element(by.xpath('//workflow-form/div/md-toolbar/div/button[@aria-label="Close"]'))
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workflows.URL_NEW);
    },
    selfCheck: function() {
      browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workflows.URL_NEW);
        return locators.workflowForm.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    enterTitle: function(title) {
      locators.fields.title.sendKeys(title);
    },
    clearTitle: function() {
      locators.fields.title.clear();
    }
  };

  return {
    locators, commands
  };
};

module.exports = NewWorkflowPage();