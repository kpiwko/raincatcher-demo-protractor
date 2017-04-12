var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

var mwp = require('../pages/worker/main.po');

var workersCrudl = require('../utils/worker.crudl');

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
      workersCrudl.create(data.workers.UPDATE1);
      workersCrudl.create(data.workers.DELETE);
      workersCrudl.create(data.workers.CANCEL);
      workersCrudl.create(data.workers.SEARCH);
    });
  });

  describe('CREATE', function() {

    it('create an empty{} worker', function() {
      workersCrudl.create({}, true);
    });
    it('required field warinigs shown', function() {
      workersCrudl.expectWarningsPresent();
    });
    it('create new ' + data.params.WORKER_TCREATE + ' worker', function() {
      workersCrudl.create(data.workers.CREATE);
    });
    it('check ' + data.params.WORKER_TCREATE + ' worker details', function() {
      workersCrudl.expectDetailsToBe(data.workers.CREATE);
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
      workersCrudl.expectToBeInList(data.workers.CREATE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
  });

  describe('UPDATE', function() {
    it('update ' + data.params.WORKER_TUPDATE1 + ' worker details', function() {
      workersCrudl.update(data.params.WORKER_TUPDATE1, data.workers.UPDATE2);
    });
    it('check ' + data.params.WORKER_TUPDATE2 + ' worker details', function() {
      workersCrudl.expectDetailsToBe(data.workers.UPDATE2);
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
      workersCrudl.expectToBeInList(data.workers.UPDATE2);
    });
    xit('mobile App login with new worker', function() {
      // TODO
    });
  });

  describe('CANCEL', function() {
    it('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workersCrudl.open(data.workers.CANCEL);
    });
    it('press [delete] button', function() {
      workersCrudl.pressDeleteButton();
    });
    it('press [cancel] button', function() {
      workersCrudl.pressCancelButton();
    });
    it('check ' + data.params.WORKER_TCANCEL + ' worker in list', function() {
      workersCrudl.expectToBeInList(data.workers.CANCEL);
    });
    xit('RAINCATCH-750: press [new] button', function() {
      workersCrudl.pressNewButton();
    });
    xit('RAINCATCH-750: press [cancel] button', function() {
      workersCrudl.pressNewCancelButton();
    });
    it('check [new] button visible', function() {
      workersCrudl.expectNewButtonIsPresent();
    });
    it('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workersCrudl.open(data.workers.CANCEL);
    });
    xit('RAINCATCH-750: press [edit] button', function() {
      workersCrudl.pressEditButton();
    });
    xit('RAINCATCH-750: press [cancel] button', function() {
      workersCrudl.pressNewCancelButton();
    });
    it('check ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workersCrudl.expectDetailsToBe(data.workers.CANCEL);
    });
  });

  describe('SEARCH', function() {
    var searched;
    it('RAINCATCH-747: search field is visible and ' + data.params.WORKER_TSEARCH + 'is searched', function() {
      searched = workersCrudl.search(data.workers.SEARCH); // RAINCATCH-747 search input is not reloading
      // other search mechanism is implemented for this test
    });
    it('check ' + data.params.WORKER_TSEARCH + ' worker in list', function() {
      workersCrudl.expectElementDetailsEqualTo(searched, data.workers.SEARCH);
    });
    it('check ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workersCrudl.expectElementDetailsNotEqualTo(searched, data.workers.DELETE);
    });
    it('search for all workers', function() {
      workersCrudl.searchReset();
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.WORKER_TDELETE + ' worker', function() {
      workersCrudl.remove(data.workers.DELETE);
    });
    it('check ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workersCrudl.expectNotInTheList(data.workers.DELETE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
  });

  describe('CLEANUP', function() {
    it('remove workers', function() {
      workersCrudl.remove(data.workers.CREATE);
      workersCrudl.remove(data.workers.UPDATE2);
      workersCrudl.remove(data.workers.CANCEL);
      workersCrudl.remove(data.workers.SEARCH);
    });
  });
});