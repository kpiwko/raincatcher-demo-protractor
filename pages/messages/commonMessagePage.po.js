// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// var expect = chai.expect;
var utils = require('../../utils/utils');

var CommonMessagePage = function() {
  var locators = {
    searchBox: element(by.id('search')),
    messageList: element(by.css('div.messages md-list')),
    messageListItems: element(by.css('div.messages md-list')).all(by.repeater('message in ctrl.list | reverse'))
  };

  var commands = {
    checkVisibility: function() {
      utils.waitUntilPresent(locators.searchBox);
      utils.checkElementsArePresent(locators.messageList);
    },
    // item can be sender or subject
    searchMessage: function(searchItem, numExpectedMessages) {
      locators.searchBox.sendKeys(searchItem);
      utils.checkListSize(locators.messageListItems, numExpectedMessages);
    },
    getMessage: function(index) {
      locators.messageListItems.get(index).click();
    }
  };

  return {
    locators, commands
  };
};

module.exports = new CommonMessagePage();
