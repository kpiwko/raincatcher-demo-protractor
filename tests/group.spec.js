var GroupService = require('../utils/group.so');
var groupService = new GroupService();

var WorkerService = require('../utils/worker.so');
var workerService = new WorkerService();

var data = require('../data/groups.do');

var constants = require('../utils/constants');
var AuthService = require('../utils/auth.so');
var authService = new AuthService();

describe('Group E2E', function() {

  before('login', function() {
    authService.openPortal();
    authService.loginPortal(constants.auth.usernames.TREVER_SMITH,
      constants.auth.DEFAULT_PASSWORD);
    authService.checkPortalLoginWasSuccessful();
  });

  describe('SETUP', function() {
    it('create groups', function() {
      groupService.create(data.groups.UPDATE1);
      groupService.create(data.groups.DELETE);
      groupService.create(data.groups.CANCEL);
      groupService.create(data.groups.SEARCH);
      groupService.create(data.groups.ADD);
    });
  });

  describe('CREATE', function() {

    it('create an empty{} group', function() {
      groupService.create({}, true);
    });
    it('required field warinigs shown', function() {
      groupService.expectWarningsPresent();
    });
    it('create new ' + data.params.GROUP_TCREATE + ' group', function() {
      groupService.create(data.groups.CREATE);
    });
    xit('RAINCATCH-793: expect ' + data.params.GROUP_TCREATE + ' group details', function() {
      groupService.expectDetailsToBe(data.groups.CREATE);
    });
    it('expect ' + data.params.GROUP_TCREATE + ' group in list', function() {
      groupService.expectToBeInList(data.groups.CREATE);
    });
  });

  describe('UPDATE', function() {
    it('update ' + data.params.GROUP_TUPDATE1 + ' group details', function() {
      groupService.update(data.groups.UPDATE1, data.groups.UPDATE2);
    });
    xit('RAINCATCH-793: check ' + data.params.GROUP_TUPDATE2 + ' group details', function() {
      groupService.expectDetailsToBe(data.groups.UPDATE2);
    });
    it('check ' + data.params.GROUP_TUPDATE2 + ' group in list', function() {
      groupService.expectToBeInList(data.groups.UPDATE2);
    });
    it('check ' + data.params.GROUP_TUPDATE1 + ' group not in list', function() {
      groupService.expectNotInTheList(data.groups.UPDATE1);
    });
  });

  describe('CANCEL', function() {
    it('open ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupService.open(data.groups.CANCEL);
    });
    it('press [delete] button', function() {
      groupService.pressDeleteButton();
    });
    it('press [cancel] button', function() {
      groupService.pressCancelButton();
    });
    it('check ' + data.params.GROUP_TCANCEL + ' group in list', function() {
      groupService.expectToBeInList(data.groups.CANCEL);
    });
    it('press [new] button', function() {
      groupService.pressNewButton();
    });
    it('press [cancel] button', function() {
      groupService.pressNewCancelButton();
    });
    it('check [new] button visible', function() {
      groupService.expectNewButtonIsPresent();
    });
    it('open ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupService.open(data.groups.CANCEL);
    });
    it('press [edit] button', function() {
      groupService.pressEditButton();
    });
    it('press [cancel] button', function() {
      groupService.pressNewCancelButton();
    });
    xit('RAINCATCH-793: check ' + data.params.GROUP_TCANCEL + ' group details', function() {
      groupService.expectDetailsToBe(data.groups.CANCEL);
    });
  });

  describe('SEARCH', function() {
    var searched;
    it('search field is visible and ' + data.params.GROUP_TSEARCH + 'is searched', function() {
      searched = groupService.search(data.groups.SEARCH, 1);
    });
    it('check ' + data.params.GROUP_TSEARCH + ' group in list', function() {
      groupService.expectElementDetailsEqualTo(searched, data.groups.SEARCH);
    });
    it('check ' + data.params.GROUP_TDELETE + ' group not in list', function() {
      groupService.expectElementDetailsNotEqualTo(searched, data.groups.DELETE);
    });
    it('search reset to list all groups', function() {
      groupService.searchReset();
    });
  });

  describe('ADD WORKER TO GROUP', function() {
    it('create test worker', function() {
      workerService.create(data.workers.ADD);
    });
    it('open test group', function() {
      groupService.open(data.groups.ADD);
    });
    it('verify test worker is in list of test group', function() {
      groupService.verifyWorkerInList(data.workers.ADD);
    });
    it('remove test worker', function() {
      workerService.remove(data.workers.ADD);
    });
    it('open test group', function() {
      groupService.open(data.groups.ADD);
    });
    it('verify test worker is not in list of test group', function() {
      groupService.verifyWorkerNotInList(data.workers.ADD);
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.GROUP_TDELETE + ' group', function() {
      groupService.remove(data.groups.DELETE);
    });
    it('check ' + data.params.GROUP_TDELETE + ' group not in list', function() {
      groupService.expectNotInTheList(data.groups.DELETE);
    });
  });

  describe('CLEANUP', function() {
    it('remove groups', function() {
      groupService.remove(data.groups.CREATE);
      groupService.remove(data.groups.UPDATE2);
      groupService.remove(data.groups.CANCEL);
      groupService.remove(data.groups.SEARCH);
      groupService.remove(data.groups.ADD);
    });
  });
});