var consts = require('../../utils/constants');
var utils = require('../../utils/utils');

var NewWorkerPage = function() {
  var workerFormSelector = 'form[name="workerForm"]';
  var locators = {
    workerForm: element(by.css(workerFormSelector)),
    fields: {
      name: element(by.css(workerFormSelector + ' #workername')),
      username: element(by.css(workerFormSelector + ' #username')),
      password: element(by.css(workerFormSelector + ' #password')),
      banner: element(by.css(workerFormSelector + ' #banner')),
      avatar: element(by.css(workerFormSelector + ' #avatar')),
      phone: element(by.css(workerFormSelector + ' #phonenumber')),
      email: element(by.css(workerFormSelector + ' #email')),
      position: element(by.css(workerFormSelector + ' #position')),
    },
    dropdowns: {
      group: element(by.css(workerFormSelector + ' #group')),
    },
    warnings: {
      invalidName: element(by.css('#workername[aria-invalid="true"]')),
      invalidUsername: element(by.css('#username[aria-invalid="true"]')),
      invalidPhone: element(by.css('#phonenumber[aria-invalid="true"]')),
      invalidEmail: element(by.css('#email[aria-invalid="true"]')),
      invalidPosition: element(by.css('#position[aria-invalid="true"]')),
      invalidGroup: element(by.css('#group[aria-invalid="true"]')),
    },
    createButton: element(by.css('button[aria-label="Create Worker"]')),
    updateButton: element(by.css('button[aria-label="Update Worker"]')),
    cancelButton: element(by.css('button[aria-label="Close"]'))
  };

  var commands = {
    navigate: function() {
      return browser.get(consts.HASH + consts.workers.URL_NEW);
    },
    selfCheck: function() {
      browser.getLocationAbsUrl().then(function(result) {
        utils.expectResultIsEquelTo(result, consts.workers.URL_NEW);
        return locators.workerForm.isPresent();
      }).then(function(result) {
        utils.expectResultIsTrue(result);
      });
    },
    // enter data into page fields
    enterName: function(name) {
      locators.fields.name.sendKeys(name);
    },
    enterUsername: function(username) {
      locators.fields.username.sendKeys(username);
    },
    enterPassword: function(password) {
      locators.fields.password.sendKeys(password);
    },
    enterBanner: function(banner) {
      locators.fields.banner.sendKeys(banner);
    },
    enterAvatar: function(avatar) {
      locators.fields.avatar.sendKeys(avatar);
    },
    enterPhone: function(phone) {
      locators.fields.phone.sendKeys(phone);
    },
    enterEmail: function(email) {
      locators.fields.email.sendKeys(email);
    },
    enterPosition: function(position) {
      locators.fields.position.sendKeys(position);
    },
    changePassword: function(password) {
      locators. workerForm.isPresent().then(function(result) {
        utils.expectResultIsTrue(result);
        return locators.fields.password.clear();
      }).then(function(result) {
        utils.expectResultIsNull(result);
        locators.fields.password.sendKeys(password);
      });
    }
  };

  return {
    locators, commands
  };
};

module.exports = NewWorkerPage();