var loginPage = require('../pages/login.po');
var schedulerPage = require('../pages/scheduler.po');

var utils = require('../utils/utils');

describe('Login into Portal App', function() {

  before('navigate to login page', function() {
    loginPage.commands.navigate();
    var progress = 'md-progress-circular';
    utils.waitNotPresent(progress);
  });
  it('login with wrong password', function() {
    loginPage.commands.selfCheck();
    loginPage.commands.login('trever', 'xxx');
  });
  it('login error message visible', function() {
    utils.waitPresent(loginPage.selectors.loginErrorMessage);
    loginPage.commands.errMsgDisplayed();
  });
  it('login with correct password', function() {
    loginPage.commands.selfCheck();
    loginPage.commands.login('trever', '123');
  });
  it('scheduler page is displayed', function() {
    utils.waitNotPresent(loginPage.selectors.logoutButton);
    schedulerPage.commands.selfCheck();
  });
  xit('open user settings', function() {
  });
  xit('change user password', function() {
  });
  it('logout from portal', function() {
    loginPage.commands.logout();
    loginPage.commands.selfCheck();
  });
  xit('login with new password', function() {
    loginPage.commands.login('trever', 'new123');
  });
  xit('scheduler page is displayed', function() {
    utils.waitNotPresent(loginPage.selectors.logoutButton);
    schedulerPage.commands.selfCheck();
  });
  xit('logout from portal', function() {
    loginPage.commands.logout();
    loginPage.commands.selfCheck();
  });
  xit('login with old password', function() {
    loginPage.commands.login('trever', 'new123');
  });
  xit('login error message visible', function() {
    utils.waitPresent(loginPage.selectors.loginErrorMessage);
    loginPage.commands.errMsgDisplayed();
  });
});