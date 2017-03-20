var consts = require('../../utils/constants');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var MainWorkerPage = function() {

  var selectors = {
    header: '//h3/span[text()="Workers"]',
    newButton: 'a[aria-label="New worker"]',
    workordersPage: '//md-tabs//md-tab-item[text()="Workorders"]',
    informationPage: '//md-tabs//md-tab-item/[text)="Information"]',
    workorderItem: '.workorder-item',
    deleteButton: 'button[aria-label="Delete"]',
    proceedButton: 'button[aria-label="Proceed"]',
    editButton: 'a[aria-label="Edit"]',
    cancelButton: 'button[aria-label="Cancel"]',
    searchField: 'input[name="search"]',
    sideMenuButton: 'md-sidenav>md-list button[aria-label$="Workers"]'
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workers.URL);
    },
    sideClick: function() {
      $(selectors.sideMenuButton).click();
    },
    selfCheck: function() {
      expect(browser.getLocationAbsUrl()).eventually.to.equal(consts.workers.URL);
      expect(element(by.xpath(selectors.header)).isPresent()).eventually.to.be.true;
      expect($(selectors.newButton).isPresent()).eventually.to.be.true;
      expect($(selectors.searchField).isPresent()).eventually.to.be.true;
    },
    openWorkordersPage: function() {
      expect(element(by.xpath(selectors.workordersPage)).isPresent()).eventually.to.be.true;
      element(by.xpath(selectors.workordersPage)).click();
      expect($(selectors.workorderItem).isPresent()).eventually.to.be.true;
    }
  };

  return {
    selectors, commands
  };
};

module.exports = MainWorkerPage();
