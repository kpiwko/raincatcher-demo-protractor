//var utils = require('../utils/utils');

var NavigationTab = function() {
  var locators = {
    toggleNavButton: element(by.css('button[ng-click*="toggleSidenav"]')),
    navList: element(by.css('md-sidenav md-list')),
    navListItems: element(by.css('md-sidenav md-list')).all(by.css('md-list-item'))
  };

  var navigateTo = {
    schedulerPage: function() {
      locators.navListItems.get(0).click();
    },
    workordersPage: function() {
      locators.navListItems.get(1).click();
    },
    workersPage: function() {
      locators.navListItems.get(2).click();
    },
    groupsPage: function() {
      locators.navListItems.get(3).click();
    },
    mapPage: function() {
      locators.navListItems.get(4).click();
    },
    messagesPage: function() {
      locators.navListItems.get(5).click();
      //return require('./messages/defaultMessagePage.po'), require('./messages/commonMessagePage.po');
    },
    filesPage: function() {
      locators.navListItems.get(6).click();
    },
    workflowsPage: function() {
      locators.navListItems.get(7).click();
    },
    formsPage: function() {
      locators.navListItems.get(8).click();
    },
    analyticsPage: function() {
      locators.navListItems.get(9).click();
    },
    logoutPage: function() {
      //this.locators.toggleNavButton.click();
      locators.navListItems.last().click();
    },
  };

  return {
    locators, navigateTo
  };
};


module.exports = new NavigationTab();
