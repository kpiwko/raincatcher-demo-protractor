var data = require('../data/messages.do');
var messagesCrudl = require('../utils/messages.crudl');
var loginUtil = require('../utils/login.util');
var newMessagePage = require('../pages/messages/newMessagePage.po');

describe('testing messages functionality in demo app', function() {
  before('navigate to login page', function() {
    loginUtil.loginPortal("trever", "123");
  });

  it('check we can see the messages section elements', function() {
    messagesCrudl.openMessages();
  });

  it('should be able to search a message and get its contents', function() {
    messagesCrudl.openMessages();
    messagesCrudl.searchForMessage(data.messages.SEARCH);
  });

  it('create a new message successfully', function() {
    var message = data.messages.CREATE;
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(message);
    messagesCrudl.searchForMessage(message);
  });

  xit('warn if "to" field is not selected', function() {
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(data.messages.CREATE_INVALID_RECEIVER);
    newMessagePage.commands.checkForReceiverError();
  });

  it('warn if subject field is not selected', function() {
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(data.messages.CREATE_INVALID_SUBJECT);
    newMessagePage.commands.checkForSubjectError();
  });

  it('warn if content field is not selected', function() {
    var message = data.messages.CREATE_INVALID_NO_CONTENT;
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(message);
    newMessagePage.commands.checkForContentError(message.charCounter);
  });

  it('warn if content is too large', function() {
    var message = data.messages.CREATE_INVALID_EXCESSIVE_CONTENT;
    messagesCrudl.openMessages();
    messagesCrudl.createNewMessage(message);
    newMessagePage.commands.checkForContentError(message.charCounter);
  });
});
