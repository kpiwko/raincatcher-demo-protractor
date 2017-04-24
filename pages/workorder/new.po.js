var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var NewWorkorderPage = function() {
  var workorderFormSelector = 'form[name="workorderForm"]';
  var locators = {
    workorderForm: element(by.css(workorderFormSelector)),
    fields: {
      title: element(by.css(workorderFormSelector + ' #inputTitle')),
      address: element(by.css(workorderFormSelector + ' #inputAddress')),
      latitude: element(by.css(workorderFormSelector + ' input[name="lattitude"]')),
      longitude: element(by.css(workorderFormSelector + ' input[name="longitude"]')), // ID is wrong in UI
      summary: element(by.css(workorderFormSelector + ' #inputSummary')),
    },
    dropdowns: {
      workflow: element(by.css(workorderFormSelector + ' #workflow')),
      assignee: element(by.css(workorderFormSelector + ' #assignee')),
    },
    datetime: {
      startDate: element(by.css(workorderFormSelector + ' #inputStartDate')),
      startTime: element(by.css(workorderFormSelector + ' #inputStartTime')),
      finishDate: element(by.css(workorderFormSelector + ' #inputFinishDate')),
      finishTime: element(by.css(workorderFormSelector + ' #inputFinishTime')),
    },
    warnings: {
      invalidWorkflow: element(by.css('[ng-messages="workorderForm.workflow.$error"] div')),
      invalidTitle: element(by.css('[ng-messages="workorderForm.title.$error"] div')),
      invalidAddress: element(by.css('[ng-messages="workorderForm.address.$error"] div')),
      invalidLatitude: element(by.css('[ng-messages="workorderForm.lattitude.$error"] div')),
      invalidLongitude: element(by.css('[ng-messages="workorderForm.longitude.$error"] div')),
      invalidStartDate: element(by.css('[ng-messages="workorderForm.startDate.$error"] div')),
      invalidStartTime: element(by.css('[ng-messages="workorderForm.startTime.$error"] div')),
      invalidFinishDate: element(by.css('[ng-messages="workorderForm.finishDate.$error"] div')),
      invalidFinishTime: element(by.css('[ng-messages="workorderForm.finishTime.$error"] div')),
      invalidSummary: element(by.css('[ng-messages="workorderForm.summary.$error"] div')),
    },
    createButton: element(by.css('button[aria-label="Create Workorder"]')),
    updateButton: element(by.css('button[aria-label="Update Workorder"]')),
    cancelButton: element(by.css('button[aria-label="Close"]'))
  };

  var commands = {

    navigate: function() {
      return browser.get(consts.HASH + consts.workorders.URL_NEW);
    },
    selfCheck: function() {
      browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workorders.URL_NEW);
        return locators.workorderForm.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    // enter data into page fields
    enterTitle: function(title) {
      return locators.fields.title.sendKeys(title);
    },
    enterAddress: function(address) {
      return locators.fields.address.sendKeys(address);
    },
    enterLatitute: function(latitude) {
      return locators.fields.latitude.sendKeys(latitude);
    },
    enterLongitude: function(longitude) {
      return locators.fields.longitude.sendKeys(longitude);
    },
    enterStartDate: function(finishDateEdit) {
      return locators.datetime.startDate.sendKeys(finishDateEdit);
    },
    enterStartTime: function(finishTime) {
      return locators.datetime.startTime.sendKeys(finishTime);
    },
    enterFinishDate: function(finishDateEdit) {
      return locators.datetime.finishDate.sendKeys(finishDateEdit);
    },
    enterFinishTime: function(finishTime) {
      return locators.datetime.finishTime.sendKeys(finishTime);
    },
    enterSummary: function(summary) {
      return locators.fields.summary.sendKeys(summary);
    },
    // clear date and time data
    clearStartDate() {
      locators.datetime.startDate.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearStartTime() {
      locators.datetime.startTime.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearFinishDate() {
      locators.datetime.finishDate.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    },
    clearFinishTime() {
      locators.datetime.finishTime.sendKeys(protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE + protractor.Key.TAB + protractor.Key.BACK_SPACE);
    }
  };

  return {
    locators,
    commands
  };
};

module.exports = NewWorkorderPage();