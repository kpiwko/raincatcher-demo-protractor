var loginPage = require('../pages/login.po');
var schedulerPage = require('../pages/scheduler.po');
var utils = require('../utils/utils');

/**
 * Used to login to the portal app
 *
 * @param username - the username of the user
 * @param password - the password of the user
 */
module.exports.loginPortal = function(username, password) {
  loginPage.commands.navigate();
  var progress = 'md-progress-circular';
  utils.waitNotPresent(progress);
  loginPage.commands.login(username, password);
  utils.waitUntilPresent(schedulerPage.locators.toolbar);
};
