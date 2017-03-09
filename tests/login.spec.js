var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

var utils = require('../utils/utils');

describe('Login into Portal App', function() {

  before('navigate to login page', function() {
    lop.commands.navigate();
    var progress = 'md-progress-circular';
    utils.waitNotPresent(progress);
  });
  it('login with wrong password', function() {
    lop.commands.selfCheck();
    lop.commands.login('trever', 'xxx');
  });
  it('login error message visible', function() {
    utils.waitPresent(lop.selectors.loginErrorMessage);
    lop.commands.errMsgDisplayed();
  });
  it('login with correct password', function() {
    lop.commands.selfCheck();
    lop.commands.login('trever', '123');
  });
  it('scheduler page is displayed', function() {
    utils.waitNotPresent(lop.selectors.logoutButton);
    scp.commands.selfCheck();
  });
  xit('open user settings', function() {
  });
  xit('change user password', function() {
  });
  it('logout from portal', function() {
    lop.commands.logout();
    lop.commands.selfCheck();
  });
  xit('login with new password', function() {
    lop.commands.login('trever', 'new123');
  });
  xit('scheduler page is displayed', function() {
    utils.waitNotPresent(lop.selectors.logoutButton);
    scp.commands.selfCheck();
  });
  xit('logout from portal', function() {
    lop.commands.logout();
    lop.commands.selfCheck();
  });
  xit('login with old password', function() {
    lop.commands.login('trever', 'new123');
  });
  xit('login error message visible', function() {
    utils.waitPresent(lop.selectors.loginErrorMessage);
    lop.commands.errMsgDisplayed();
  });
});