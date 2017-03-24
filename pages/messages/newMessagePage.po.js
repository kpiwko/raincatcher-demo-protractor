// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// var expect = chai.expect;
var utils = require('../../utils/utils');

var NewMessagePage = function() {
  var locators = {
    newMessageSendTo: element(by.model('ctrl.model.receiver')),
    selectMenu: element(by.css('md-select-menu')),
    selectedReceiver: element(by.css('md-option[selected="selected"]')),
    newMessageSubject: element(by.model('ctrl.model.subject')),
    newMessageContent: element(by.model('ctrl.model.content')),
    sendMessageButton: element(by.css('[aria-label="Send message"]')),
    contentWarningAlert: element(by.css('div[ng-messages="messageForm.content.$error"] div')),
    toWarningAlert: element(by.css('div[ng-messages="messageForm.receiver.$error"] div')),
    subjectWarningAlert: element(by.css('div[ng-messages="messageForm.subject.$error"] div')),
    charCounterError: element(by.css('div.md-errors-spacer .md-char-counter')),
    defaultToAlert: "The To: field is required.",
    defaultSubjectAlert: "A subject is required.",
    defaultNoContentAlert: "Message content is required."
  };

  var commands = {
    checkVisibility: function() {
      utils.waitUntilPresent(locators.newMessageSendTo);
      utils.checkElementsArePresent([ locators.newMessageSubject,
        locators.newMessageContent,
        locators.sendMessageButton ]);
    },
    checkForReceiverError: function() {
      utils.checkElementVisibilityAndValue(locators.toWarningAlert,
        locators.defaultToAlert);
    },
    checkForSubjectError: function() {
      utils.checkElementVisibilityAndValue(locators.subjectWarningAlert,
        locators.defaultSubjectAlert);
    },
    checkForContentError: function(expectedCharCounter) {
      utils.checkElementVisibilityAndValue(locators.charCounterError,
        expectedCharCounter);
      if (expectedCharCounter === "0/350") {
        utils.checkElementVisibilityAndValue(locators.contentWarningAlert,
          locators.defaultNoContentAlert);
      }
    },
    createNewMessage: function(receiver, subject, content) {
      if (receiver !== "") {
        locators.newMessageSendTo.sendKeys(receiver);
        utils.waitUntilPresent(locators.selectMenu);
        locators.selectedReceiver.click();
      }

      locators.newMessageSubject.sendKeys(subject);
      locators.newMessageContent.sendKeys(content);

      locators.sendMessageButton.click();
    }
  };

  return {
    locators, commands
  };
};

module.exports = new NewMessagePage();
