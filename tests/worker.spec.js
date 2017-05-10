var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');
var mwp = require('../pages/worker/main.po');

var WorkerService = require('../utils/worker.so');
var workerService = new WorkerService();

var utils = require('../utils/utils');
var data = require('../data/workers.do');

describe('Worker E2E', function() {

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
    it('create workers', function() {
      workerService.create(data.workers.UPDATE1);
      workerService.create(data.workers.DELETE);
      workerService.create(data.workers.CANCEL);
      workerService.create(data.workers.SEARCH);
    });
  });

  describe('CREATE', function() {

    it('create an empty{} worker', function() {
      workerService.create({}, true);
    });
    it('required field warinigs shown', function() {
      workerService.expectWarningsPresent();
    });
    it('create new ' + data.params.WORKER_TCREATE + ' worker', function() {
      workerService.create(data.workers.CREATE);
    });
    it('check ' + data.params.WORKER_TCREATE + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.CREATE);
    });
    it('RAINCATCH-747: open schedule page', function() {
      scp.commands.sideClick();
      scp.commands.selfCheck();
    });
    it('RAINCATCH-747: open workers page', function() {
      mwp.commands.sideClick();
      mwp.commands.selfCheck();
    });
    it('check ' + data.params.WORKER_TCREATE + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.CREATE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
  });

  describe('UPDATE', function() {
    it('update ' + data.params.WORKER_TUPDATE1 + ' worker details', function() {
      workerService.update(data.workers.UPDATE1, data.workers.UPDATE2);
    });
    it('check ' + data.params.WORKER_TUPDATE2 + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.UPDATE2);
    });
    it('RAINCATCH-747: open schedule page', function() {
      scp.commands.sideClick();
      scp.commands.selfCheck();
    });
    it('RAINCATCH-747: open workers page', function() {
      mwp.commands.sideClick();
      mwp.commands.selfCheck();
    });
    it('check ' + data.params.WORKER_TUPDATE2 + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.UPDATE2);
    });
    it('check ' + data.params.WORKER_TUPDATE1 + ' worker not in list', function() {
      workerService.expectNotInTheList(data.workers.UPDATE1);
    });
    xit('mobile App login with new worker', function() {
      // TODO
    });
  });

  describe('CANCEL', function() {
    it('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.open(data.workers.CANCEL);
    });
    it('press [delete] button', function() {
      workerService.pressDeleteButton();
    });
    it('press [cancel] button', function() {
      workerService.pressCancelButton();
    });
    it('check ' + data.params.WORKER_TCANCEL + ' worker in list', function() {
      workerService.expectToBeInList(data.workers.CANCEL);
    });
    xit('RAINCATCH-750: press [new] button', function() {
      workerService.pressNewButton();
    });
    xit('RAINCATCH-750: press [cancel] button', function() {
      workerService.pressNewCancelButton();
    });
    it('check [new] button visible', function() {
      workerService.expectNewButtonIsPresent();
    });
    it('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.open(data.workers.CANCEL);
    });
    xit('RAINCATCH-750: press [edit] button', function() {
      workerService.pressEditButton();
    });
    xit('RAINCATCH-750: press [cancel] button', function() {
      workerService.pressNewCancelButton();
    });
    it('check ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workerService.expectDetailsToBe(data.workers.CANCEL);
    });
  });

  describe('SEARCH', function() {
    var searched;
    it('RAINCATCH-747: search field is visible and ' + data.params.WORKER_TSEARCH + 'is searched', function() {
      searched = workerService.search(data.workers.SEARCH); // RAINCATCH-747 search input is not reloading
      // other search mechanism is implemented for this test
    });
    it('check ' + data.params.WORKER_TSEARCH + ' worker in list', function() {
      workerService.expectElementDetailsEqualTo(searched, data.workers.SEARCH);
    });
    it('check ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workerService.expectElementDetailsNotEqualTo(searched, data.workers.DELETE);
    });
    it('search reset to list all workers', function() {
      workerService.searchReset();
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.WORKER_TDELETE + ' worker', function() {
      workerService.remove(data.workers.DELETE);
    });
    it('check ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workerService.expectNotInTheList(data.workers.DELETE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
  });

  describe('CLEANUP', function() {
    it('remove workers', function() {
      workerService.remove(data.workers.CREATE);
      workerService.remove(data.workers.UPDATE2);
      workerService.remove(data.workers.CANCEL);
      workerService.remove(data.workers.SEARCH);
    });
  });
});