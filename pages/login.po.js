var consts = require('../utils/constants');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var LoginPage = function() {

  var selectors = {
    username: 'form[name="loginForm"] input#username',
    password: 'form[name="loginForm"] #password',
    loginButton: 'form[name="loginForm"] button[aria-label="Log in"]',
    loginErrorMessage: 'div[ng-message=error]',
    logoutSideButton: 'md-sidenav>md-list button[aria-label$="Logout"]',
    logoutButton: 'md-content button[aria-label="Log out"]'
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.login.URL);
    },
    selfCheck: function() {
      expect(browser.getLocationAbsUrl()).eventually.to.equal(consts.login.URL);
      expect($(selectors.username).isPresent()).eventually.to.be.true;
      expect($(selectors.password).isPresent()).eventually.to.be.true;
    },
    login: function(username, password) {
      $(selectors.username).clear().sendKeys(username);
      expect($(selectors.username).getAttribute(consts.login.VALUE_ATTRIBUTE))
        .eventually.to.have.string(username);
      $(selectors.password).clear().sendKeys(password);
      expect($(selectors.password).getAttribute(consts.login.VALUE_ATTRIBUTE))
        .eventually.to.have.string(password);
      $(selectors.loginButton).click();
    },
    errMsgDisplayed: function() {
      expect($(selectors.loginErrorMessage).getText())
        .eventually.to.have.string(consts.login.AUTH_FAIL_MSG);
    },
    logout: function() {
      $(selectors.logoutSideButton).click();
      $(selectors.logoutButton).click();
    }
  };

  return {
    selectors, commands
  };
};

module.exports = LoginPage();
