var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var MainWorkorderPage = function() {
  var selectors = {
    header: '//h3/span[text()="Workorders"]',
    newButton: 'a[aria-label="New Workorder"]',
    deleteButton: 'button[aria-label="Delete"]',
    proceedButton: 'button[aria-label="Proceed"]',
    editButton: 'a[aria-label="Edit"]',
    cancelButton: 'button[aria-label="Cancel"]',
    searchField: 'input[name="search"]',
    summaryInfo: 'workorder>md-list',
    sideMenuButton: 'md-sidenav>md-list button[aria-label$="Workorders"]'
  };

  var commands = {
    navigate: function() {
      return browser.get('#/workorders/list');
    },
    sideClick: function() {
      $(selectors.sideMenuButton).click();
    },
    selfCheck: function() {
      expect(element(by.xpath(selectors.header)).isPresent()).eventually.to.be.true;
      expect($(selectors.newButton).isPresent()).eventually.to.be.true;
      expect($(selectors.searchField).isPresent()).eventually.to.be.true;
    }
  };

  return {
    selectors, commands
  };
};

module.exports = MainWorkorderPage();