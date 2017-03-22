var consts = require('../../utils/constants');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var CreateWorkerPage = function() {

  var selectors = {
    workerForm: {
      self: 'form[name="workerForm"]',
      nameField: '#workername',
      usernameField: '#username',
      passwordField: '#password',
      bannerField: '#banner',
      avatarField: '#avatar',
      phoneField: '#phonenumber',
      emailField: '#email',
      positionField: '#position',
      groupSelector: '#group',

      invalidNameField: '#workername[aria-invalid="true"]',
      invalidUsernameField: '#username[aria-invalid="true"]',
      invalidPhoneField: '#phonenumber[aria-invalid="true"]',
      invalidEmailField: '#email[aria-invalid="true"]',
      invalidPositionField: '#position[aria-invalid="true"]',
      invalidGroupSelect: '#group[aria-invalid="true"]',

      createButton: 'button[aria-label="Create Worker"]',
      updateButton: 'button[aria-label="Update Worker"]',
      cancelButton: 'button[aria-label="Close"]',
    }
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workers.URL_NEW);
    },
    selfCheck: function() {
      expect(browser.getLocationAbsUrl()).eventually.to.equal(consts.workers.URL_NEW);
      expect($(selectors.workerForm.self).isPresent()).eventually.to.be.true;
    },
    fillInTheFields: function(params) {
      expect($(selectors.workerForm.self).isPresent()).eventually.to.be.true;
      $(selectors.workerForm.nameField).sendKeys(params.name);
      $(selectors.workerForm.usernameField).sendKeys(params.username);
      $(selectors.workerForm.passwordField).sendKeys(params.password);
      $(selectors.workerForm.bannerField).sendKeys(params.banner);
      $(selectors.workerForm.avatarField).sendKeys(params.avatar);
      $(selectors.workerForm.phoneField).sendKeys(params.phonenumber);
      $(selectors.workerForm.emailField).sendKeys(params.email);
      $(selectors.workerForm.positionField).sendKeys(params.position);
    },
    changePassword: function(password) {
      expect($(selectors.workerForm.self).isPresent()).eventually.to.be.true;
      $(selectors.workerForm.passwordField).clear().sendKeys(password);
      $(selectors.workerForm.phoneField).sendKeys('+420777777777'); // BUG phone should be added
    },
    warningsAreShown: function() {
      expect($(selectors.workerForm.self).isPresent()).eventually.to.be.true;
      expect($(selectors.workerForm.invalidNameField).isPresent()).eventually.to.be.true;
      expect($(selectors.workerForm.invalidUsernameField).isPresent()).eventually.to.be.true;
      expect($(selectors.workerForm.invalidPhoneField).isPresent()).eventually.to.be.true;
      expect($(selectors.workerForm.invalidEmailField).isPresent()).eventually.to.be.true;
      expect($(selectors.workerForm.invalidPositionField).isPresent()).eventually.to.be.true;
      expect($(selectors.workerForm.invalidGroupSelect).isPresent()).eventually.to.be.true;
    },
    clearValues: function() {
      expect($(selectors.workerForm.self).isPresent()).eventually.to.be.true;
      $(selectors.workerForm.nameField).clear();
      $(selectors.workerForm.usernameField).clear();
      $(selectors.workerForm.passwordField).clear();
      $(selectors.workerForm.bannerField).clear();
      $(selectors.workerForm.avatarField).clear();
      $(selectors.workerForm.phoneField).clear();
      $(selectors.workerForm.emailField).clear();
      $(selectors.workerForm.positionField).clear();
    }
  };

  return {
    selectors, commands
  };
};

module.exports = CreateWorkerPage();