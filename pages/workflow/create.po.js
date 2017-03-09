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
      return browser.get('#/workflows/list/workflows/');
    },
    fillInTheFields: function(params) {
      expect($(selectors.workflowForm.self).isPresent()).eventually.to.be.true;
      $(selectors.workflowForm.titleField).sendKeys(params.title);
    },
    verifyInvalid: function() {
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