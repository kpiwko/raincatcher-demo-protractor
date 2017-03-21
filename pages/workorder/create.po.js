var consts = require('../../utils/constants');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var CreateWorkorderPage = function() {
  var selectors = {
    workorderForm: {
      self: 'form[name="workorderForm"]',
      workflowField: '#workflow',
      assigneeField: '#assignee',
      titleField: '#inputTitle',
      addressField: '#inputAddress',
      latitudeField: 'input[name="lattitude"]',
      longitudeField: 'input[name="longitude"]', // ID is wrong in UI
      finishDateField: '#inputFinishDate',
      finishTimeField: '#inputFinishTime',
      summaryField: '#inputSummary',

      workflowWarning: '[ng-messages="workorderForm.workflow.$error"] div',
      titleWarning: '[ng-messages="workorderForm.title.$error"] div',
      addressWarning: '[ng-messages="workorderForm.address.$error"] div',
      latitudeWarning: '[ng-messages="workorderForm.lattitude.$error"] div',
      longitudeWarning: '[ng-messages="workorderForm.longitude.$error"] div',
      finishDateWarning: '[ng-messages="workorderForm.finishDate.$error"] div',
      finishTimeWarning: '[ng-messages="workorderForm.finishTime.$error"] div',
      summaryWarning: '[ng-messages="workorderForm.summary.$error"] div',

      createButton: 'button[aria-label="Create Workorder"]',
      updateButton: 'button[aria-label="Update Workorder"]',
      cancelButton: 'button[aria-label="Close"]',
    }
  };

  var commands = {

    navigate: function() {
      return browser.get(consts.HASH + consts.workorders.URL_NEW);
    },
    selfCheck: function() {
      expect(browser.getLocationAbsUrl()).eventually.to.equal(consts.workorders.URL_NEW);
      expect($(selectors.workorderForm.self).isPresent()).eventually.to.be.true;
    },
    fillInTheFields: function(params) {
      expect($(selectors.workorderForm.self).isPresent()).eventually.to.be.true;
      $(selectors.workorderForm.titleField).sendKeys(params.title);
      $(selectors.workorderForm.addressField).sendKeys(params.address);
      $(selectors.workorderForm.latitudeField).sendKeys(params.latitude);
      $(selectors.workorderForm.longitudeField).sendKeys(params.longitude);
      $(selectors.workorderForm.finishDateField).sendKeys(params.finishDateEdit);
      $(selectors.workorderForm.finishTimeField).sendKeys(params.finishTime);
      $(selectors.workorderForm.summaryField).sendKeys(params.summary);
    },
    clearValues: function() {
      expect($(selectors.workorderForm.self).isPresent()).eventually.to.be.true;
      $(selectors.workorderForm.titleField).clear();
      $(selectors.workorderForm.addressField).clear();
      $(selectors.workorderForm.latitudeField).clear();
      $(selectors.workorderForm.longitudeField).clear();
      // $(selectors.workorderForm.finishDateField).sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
      // $(selectors.workorderForm.finishTimeField).sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
      $(selectors.workorderForm.summaryField).clear();
    },
    elementsArePresent: function() {
      expect($(selectors.workorderForm.self).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.titleField).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.addressField).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.latitudeField).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.longitudeField).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.finishDateField).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.finishTimeField).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.summaryField).isPresent()).eventually.to.be.true;
    },
    warningsAreShown: function() {
      expect($(selectors.workorderForm.self).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.workflowWarning).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.titleWarning).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.addressWarning).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.latitudeWarning).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.longitudeWarning).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.finishDateWarning).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.finishTimeWarning).isPresent()).eventually.to.be.true;
      expect($(selectors.workorderForm.summaryWarning).isPresent()).eventually.to.be.true;
    },
  };

  return {
    selectors, commands
  };
};

module.exports = CreateWorkorderPage();