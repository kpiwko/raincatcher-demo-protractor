var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

var cgp = require('../pages/group/create.po');
var mgp = require('../pages/group/main.po');

var groupsCrudl = require('../utils/group.crudl');
var workerCrudl = require('../utils/worker.crudl');

var utils = require('../utils/utils');
var data = require('../data/groups.do');

describe('Group E2E', function() {

  before('login', function() {
    lop.commands.navigate();
    var progress = 'md-progress-circular';
    utils.waitNotPresent(progress);
    lop.commands.selfCheck();
    lop.commands.login('trever', '123');
    utils.waitNotPresent(lop.selectors.logoutButton);
    scp.commands.selfCheck();
  });

  describe('SETUP', function() {
    it('create groups', function() {
      groupsCrudl.create(data.groups.UPDATE1);
      groupsCrudl.create(data.groups.DELETE);
      groupsCrudl.create(data.groups.CANCEL);
      groupsCrudl.create(data.groups.SEARCH);
      groupsCrudl.create(data.groups.ADD);
    });
  });

  describe('CREATE', function() {

    it('create an empty{} group', function() {
      groupsCrudl.create({}, true);
    });
    it('required field warinigs shown', function() {
      cgp.commands.warningsAreShown();
    });
    it('create new ' + data.params.GROUP_TCREATE + ' group', function() {
      groupsCrudl.create(data.groups.CREATE);
    });
    it('verify ' + data.params.GROUP_TCREATE + ' group details', function() {
      groupsCrudl.verifyDetails(data.groups.CREATE);
    });
    it('verify ' + data.params.GROUP_TCREATE + ' group in list', function() {
      groupsCrudl.verifyInList(data.groups.CREATE);
    });
  });

  describe('UPDATE', function() {
    it('update ' + data.params.GROUP_TUPDATE1 + ' group details', function() {
      groupsCrudl.update(data.params.GROUP_TUPDATE1, data.groups.UPDATE2);
    });
    it('verify ' + data.params.GROUP_TUPDATE2 + ' group details', function() {
      groupsCrudl.verifyDetails(data.groups.UPDATE2);
    });
    it('verify ' + data.params.GROUP_TUPDATE2 + ' group in list', function() {
      groupsCrudl.verifyInList(data.groups.UPDATE2);
    });
  });

  describe('CANCEL', function() {
    it('open ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupsCrudl.open(data.groups.CANCEL);
    });
    it('press [delete] button', function() {
      expect($(mgp.selectors.deleteButton).isPresent()).eventually.to.be.true;
      $(mgp.selectors.deleteButton).click();
      expect($(mgp.selectors.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(mgp.selectors.cancelButton).click();
      expect($(mgp.selectors.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify ' + data.params.GROUP_TCANCEL + ' group in list', function() {
      groupsCrudl.verifyInList(data.groups.CANCEL);
    });
    it('press [new] button', function() {
      expect($(mgp.selectors.newButton).isPresent()).eventually.to.be.true;
      $(mgp.selectors.newButton).click();
      expect($(cgp.selectors.groupForm.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(cgp.selectors.groupForm.cancelButton).click();
      expect($(cgp.selectors.groupForm.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify [new] button visible', function() {
      expect($(mgp.selectors.newButton).isPresent()).eventually.to.be.true;
    });
    it('open ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupsCrudl.open(data.groups.CANCEL);
    });
    it('press [edit] button', function() {
      expect($(mgp.selectors.editButton).isPresent()).eventually.to.be.true;
      $(mgp.selectors.editButton).click();
      expect($(cgp.selectors.groupForm.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(cgp.selectors.groupForm.cancelButton).click();
      expect($(cgp.selectors.groupForm.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupsCrudl.verifyDetails(data.groups.CANCEL);
    });
  });

  describe('SEARCH', function() {
    it('open groups page', function() {
      mgp.commands.sideClick();
      mgp.commands.selfCheck();
    });
    it('search field is visible', function() {
      expect($(mgp.selectors.searchField).isPresent()).eventually.to.be.true;
      $(mgp.selectors.searchField).sendKeys(data.params.GROUP_TSEARCH);
      browser.sleep(2000); // wait 2 secs to do search
    });
    it('verify ' + data.params.GROUP_TSEARCH + ' group in list', function() {
      groupsCrudl.verifyInList(data.groups.SEARCH);
    });
    it('verify ' + data.params.GROUP_TDELETE + ' group not in list', function() {
      groupsCrudl.verifyNotInList(data.groups.DELETE);
    });
    it('clean search text', function() {
      $(mgp.selectors.searchField).clear(); // clear search text
      browser.sleep(2000); // wait 2 secs to do search
    });
  });

  describe.skip('ADD WORKER TO GROUP', function() { //RAINCATCH-700
    it('create test worker', function() {
      workerCrudl.create(data.workers.ADD);
    });
    it('open test group', function() {
      groupsCrudl.open(data.groups.ADD);
    });
    it('verify test worker is in list of test group', function() {
      groupsCrudl.verifyWorkerInList(data.workers.ADD);
    });
    it('remove test worker', function() {
      workerCrudl.remove(data.workers.ADD);
    });
    it('open test group', function() {
      groupsCrudl.open(data.groups.ADD);
    });
    it('verify test worker is not in list of test group', function() {
      groupsCrudl.verifyWorkerNotInList(data.workers.ADD);
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.GROUP_TDELETE + ' group', function() {
      groupsCrudl.remove(data.groups.DELETE);
    });
    it('verify ' + data.params.GROUP_TDELETE + ' group not in list', function() {
      groupsCrudl.verifyNotInList(data.groups.DELETE);
    });
  });

  describe('CLEANUP', function() {
    it('remove groups', function() {
      groupsCrudl.remove(data.groups.CREATE);
      groupsCrudl.remove(data.groups.UPDATE2);
      groupsCrudl.remove(data.groups.CANCEL);
      groupsCrudl.remove(data.groups.SEARCH);
      groupsCrudl.remove(data.groups.ADD);
    });
  });
});