var consts = require('../../utils/constants');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var CreateWorkflowPage = function() {
  var selectors = {
    workflowForm: {
      self: 'form[name="workflowForm"]',
      titleField: '#title',
      createButton: 'button[aria-label="Create Workflow"]',
      invalidTitleField: '#title[aria-invalid="true"]',
      updateButton: 'button[aria-label="Update Workflow"]',
      cancelButton: 'button[aria-label="Close"]'
    }
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workflows.URL_NEW);
    },
    selfCheck: function() {
      expect(browser.getLocationAbsUrl()).eventually.to.equal(consts.workflows.URL_NEW);
      expect($(selectors.workflowForm.self).isPresent()).eventually.to.be.true;
    },
    fillInTheFields: function(params) {
      expect($(selectors.workflowForm.self).isPresent()).eventually.to.be.true;
      $(selectors.workflowForm.titleField).sendKeys(params.title);
    },
    warningsAreShown: function() {
      expect($(selectors.workflowForm.self).isPresent()).eventually.to.be.true;
      expect($(selectors.workflowForm.invalidTitleField).isPresent()).eventually.to.be.true;
    },
    clearValues: function() {
      expect($(selectors.workflowForm.self).isPresent()).eventually.to.be.true;
      $(selectors.workflowForm.titleField).clear();
    }
  };

  return {
    selectors, commands
  };
};

module.exports = CreateWorkflowPage();