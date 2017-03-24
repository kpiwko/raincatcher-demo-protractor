var consts = require('../../utils/constants');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var MainGroupPage = function() {
  var selectors = {
    header: '//h3/span[text()="Groups"]',
    newButton: 'a[aria-label="New group"]',
    deleteButton: 'button[aria-label="Delete"]',
    proceedButton: 'button[aria-label="Proceed"]',
    editButton: 'a[aria-label="Edit"]',
    cancelButton: 'button[aria-label="Cancel"]',
    searchField: '#search',
    summaryInfo: 'group>md-list',
    sideMenuButton: 'md-sidenav>md-list button[aria-label$="Groups"]'
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.groups.URL);
    },
    sideClick: function() {
      $(selectors.sideMenuButton).click();
    },
    selfCheck: function() {
      expect(browser.getLocationAbsUrl()).eventually.to.equal(consts.groups.URL);
      expect(element(by.xpath(selectors.header)).isPresent()).eventually.to.be.true;
      expect($(selectors.newButton).isPresent()).eventually.to.be.true;
      expect($(selectors.searchField).isPresent()).eventually.to.be.true;
    }
  };

  return {
    selectors, commands
  };
};

module.exports = MainGroupPage();
