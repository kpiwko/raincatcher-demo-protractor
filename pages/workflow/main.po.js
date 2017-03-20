var consts = require('../../utils/constants');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var MainWorkflowPage = function() {
  var selectors = {
    header: '//h3/span[text()="Workflows"]',
    deleteButton: 'button[aria-label="Delete"]',
    proceedButton: 'button[aria-label="Proceed"]',
    editButton: 'a[aria-label="Edit"]',
    cancelButton: 'button[aria-label="Cancel"]',
    addButton: 'a[aria-label="Add Workflow"]',
    newButton: 'a[aria-label="New Workflow"]',
    searchField: '#search',
    sideMenuButton: 'md-sidenav>md-list button[aria-label$="Workflows"]',

    stepForm: {
      self: 'form[name="workflowStepForm"]',
      codeField: '#code',
      nameField: '#name',
      formIdField: '#formId',
      formField: '#form',
      viewField: '#view',
      addStepButton: 'button[aria-label="Add step"]',
      updateStepButton: 'button[aria-label="Update step"]',

      invalidCodeField: '#code[aria-invalid="true"]',
      invalidNameField: '#name[aria-invalid="true"]'
    }
  };
  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workflows.URL);
    },
    sideClick: function() {
      $(selectors.sideMenuButton).click();
    },
    selfCheck: function() {
      expect(browser.getLocationAbsUrl()).eventually.to.equal(consts.workflows.URL);
      expect(element(by.xpath(selectors.header)).isPresent()).eventually.to.be.true;
      expect($(selectors.newButton).isPresent()).eventually.to.be.true;
      expect($(selectors.searchField).isPresent()).eventually.to.be.true;
    },
    fillInTheStepFields: function(params) {
      expect($(selectors.stepForm.self).isPresent()).eventually.to.be.true;
      $(selectors.stepForm.codeField).sendKeys(params.code);
      $(selectors.stepForm.nameField).sendKeys(params.name);
      $(selectors.stepForm.formIdField).sendKeys(params.formId);
      $(selectors.stepForm.formField).sendKeys(params.form);
      $(selectors.stepForm.viewField).sendKeys(params.view);
    },
    clearStepValues: function() {
      expect($(selectors.stepForm.self).isPresent()).eventually.to.be.true;
      $(selectors.stepForm.codeField).clear();
      $(selectors.stepForm.nameField).clear();
      $(selectors.stepForm.formIdField).clear();
      $(selectors.stepForm.formField).clear();
      $(selectors.stepForm.viewField).clear();
    },
    verifyInvalidStepFields: function() {
      expect($(selectors.stepForm.invalidCodeField).isPresent()).eventually.to.be.true;
      expect($(selectors.stepForm.invalidNameField).isPresent()).eventually.to.be.true;
    }
  };

  return {
    selectors, commands
  };
};

module.exports = MainWorkflowPage();