var navigationTab = require('../pages/navigation.po');
var loginPage = require('../pages/login.po');
var logoutPage = require('../pages/logout.po');
var schedulerPage = require('../pages/scheduler.po');
var utils = require('../utils/utils');

/**
 * Used to login to the portal app
 *
 * @param username - the username of the user
 * @param password - the password of the user
 */
var loginPortal = function(username, password) {
  loginPage.commands.navigate();
  var progress = 'md-progress-circular';
  utils.waitNotPresent(progress);
  loginPage.commands.login(username, password);
  utils.waitUntilPresent(schedulerPage.locators.header, 5000);
};

/**
 * Used to check if portal login was successful
 */
var checkPortalLoginWasSuccessful = function() {
  utils.checkElementsArePresent([ schedulerPage.locators.toolbar,
    schedulerPage.locators.header,
    schedulerPage.locators.datePicker,
    schedulerPage.locators.openCalendarIconButton,
    schedulerPage.locators.openCalendarTriangleButton,
    schedulerPage.locators.workOrdersList ]);
};

/**
 * Used to logout of the portal app
 */
var logoutPortal = function() {
  navigationTab.navigateTo.logoutPage();
  utils.waitUntilPresent(logoutPage.locators.logOutButton);
  logoutPage.commands.clicklogOutButton();
  utils.waitUntilPresent($(loginPage.selectors.loginButton));
};

/**
 * Used to check if portal logout was successful
 */
var checkPortalLogoutWasSuccessful = function() {
  utils.checkElementsArePresent([$(loginPage.selectors.username),
    $(loginPage.selectors.password),
    $(loginPage.selectors.loginButton)]);
};

/**
 * Used to login to the mobile app
 *
 * @param username
 * @param password
 */
var loginClient = function() {
  console.log('loginClient() is not yet implemented');
  //TODO - add parameters username and password to this function
  //TODO - navigate to client login
  //TODO - enter password and username
  //TODO - wait for element to be present
};

/**
 * Used to logout of the client app
 */
var logoutClient = function() {
  console.log('logoutClient() is not yet implemented');
  //TODO - go to logout page
  //TODO - click logout
};

module.exports = {
  checkPortalLoginWasSuccessful,
  checkPortalLogoutWasSuccessful,

  loginPortal,
  logoutPortal,
  loginClient,
  logoutClient
};

