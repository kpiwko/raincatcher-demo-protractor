var loginPage = require('../pages/login.po');
var schedulerPage = require('../pages/scheduler.po');
var utils = require('../utils/utils');

module.exports.loginPortal = function(username, password) {
  loginPage.commands.navigate();
  var progress = 'md-progress-circular';
  utils.waitNotPresent(progress);
  loginPage.commands.login(username, password);
  utils.waitPresent(schedulerPage.selectors.toolbar);
};
