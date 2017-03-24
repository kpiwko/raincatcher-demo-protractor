var consts = require('../../utils/constants');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var CreateGroupPage = function() {
  var selectors = {
    groupForm: {
      self: 'form[name="groupForm"]',
      nameField: '#groupname',
      roleField: '#assignee',

      invalidNameField: '#groupname[aria-invalid="true"]',

      createButton: 'button[aria-label="Create Group"]',
      updateButton: 'button[aria-label="Update Group"]',
      cancelButton: 'button[aria-label="Close"]'
    }
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.groups.URL_NEW);
    },
    selfCheck: function() {
      expect(browser.getLocationAbsUrl()).eventually.to.equal(consts.groups.URL_NEW);
      expect($(selectors.groupForm.self).isPresent()).eventually.to.be.true;
    },
    fillInTheFields: function(params) {
      expect($(selectors.groupForm.nameField).isPresent()).eventually.to.be.true;
      $(selectors.groupForm.nameField).sendKeys(params.name);
    },
    warningsAreShown: function() {
      expect($(selectors.groupForm.invalidNameField).isPresent()).eventually.to.be.true;
    },
    clearValues: function() {
      expect($(selectors.groupForm.self).isPresent()).eventually.to.be.true;
      $(selectors.groupForm.nameField).clear();
    }
  };

  return {
    selectors, commands
  };

};

module.exports = CreateGroupPage();