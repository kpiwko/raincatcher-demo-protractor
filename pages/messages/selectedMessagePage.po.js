// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// var expect = chai.expect;
var utils = require('../../utils/utils');



var SelectedMessagesPage = function() {
  var locators = {
    messageSubject: element(by.css('md-toolbar.content-toolbar div.md-toolbar-tools h3.ng-binding')),
    messageHeader: element(by.css('div.message-header')),
    messageHeaderItems: element(by.css('div.message div.message-header')).all(by.css('div')),
    messageContent: element(by.css('div.message p'))
  };

  var commands = {
    checkVisibility: function() {
      utils.waitUntilPresent(locators.messageSubject);
      utils.checkElementsArePresent([ locators.messageHeader,
        locators.messageContent]);
    },
    checkMessageContents: function(subject, sender, receiver, status, content) {
      var elementlocators = [ locators.messageSubject,
        locators.messageHeaderItems.get(0),
        locators.messageHeaderItems.get(1),
        locators.messageHeaderItems.get(2),
        locators.messageContent];
      var expectedValues = [ subject,
        'From: ' + sender,
        'To:' + receiver,
        'Status: ' +status,
        content ];
      utils.checkValuesAreCorrect(elementlocators, expectedValues);
    }
  };

  return {
    locators, commands
  };
};

module.exports = new SelectedMessagesPage();
