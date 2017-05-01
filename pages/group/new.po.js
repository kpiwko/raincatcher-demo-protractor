var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var CreateGroupPage = function() {
  var groupFormSelector = 'form[name="groupForm"]';
  var locators = {
    groupForm: element(by.css(groupFormSelector)),
    fields: {
      name: element(by.css(groupFormSelector + ' #groupname')),
    },
    dropdowns: {
      role: element(by.css(groupFormSelector + ' #assignee')),
    },
    warnings: {
      invalidName: element(by.css('#groupname[aria-invalid="true"]')),
    },
    createButton: element(by.css('button[aria-label="Create Group"]')),
    updateButton: element(by.css('button[aria-label="Update Group"]')),
    cancelButton: element(by.css('button[aria-label="Close"]'))
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.groups.URL_NEW);
    },
    selfCheck: function() {
      browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.groups.URL_NEW);
        return locators.groupForm.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    enterName: function(name) {
      locators.fields.name.sendKeys(name);
    },
    enterRole: function(role) {
      locators.dropdowns.role.sendKeys(role);
    }
  };

  return {
    locators, commands
  };

};


module.exports = CreateGroupPage();