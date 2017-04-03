var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

var workordersCrudl = require('../utils/workorder.so');
var workersCrudl = require('../utils/worker.crudl');
var workflowCrudl = require('../utils/workflow.crudl');

var utils = require('../utils/utils');
var data = require('../data/workorders.do');

describe('Workorder E2E', function() {

  before('LOGIN', function() {
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
      workersCrudl.create(data.workers.WORKER1);
      workersCrudl.create(data.workers.WORKER2);
    });
    it('create workflows', function() {
      workflowCrudl.create(data.workflows.WORKFLOW1);
      workflowCrudl.create(data.workflows.WORKFLOW2);
    });
    it('create workorders', function() {
      workordersCrudl.create(data.workorders.UPDATE1);
      workordersCrudl.create(data.workorders.CANCEL);
      workordersCrudl.create(data.workorders.SEARCH);
      workordersCrudl.create(data.workorders.DELETE);
    });
  });

  describe('CREATE', function() {
    it('create an empty{} workorder', function() {
      workordersCrudl.create({}, true);
    });
    it('check field warinigs shown', function() {
      workordersCrudl.expectWarningsPresent();
    });
    it('create new ' + data.params.WORKORDER_TCREATE + ' workorder', function() {
      workordersCrudl.create(data.workorders.CREATE);
    });
    it('open ' + data.params.WORKORDER_TCREATE + ' workorder', function() { //RAINCATCH-641
      workordersCrudl.open(data.workorders.CREATE); // open workorder to see details
    });
    it('check ' + data.params.WORKORDER_TCREATE + ' workorder details', function() { //RAINCATCH-641
      workordersCrudl.expectDetailsToBe(data.workorders.CREATE); // compare workorder details
    });
    it('check ' + data.params.WORKORDER_TCREATE + ' workorder in list', function() {
      workordersCrudl.expectToBeInList(data.workorders.CREATE);
    });
    it('open ' + data.params.WORKER_TCRUDL1 + ' worker', function() {
      workersCrudl.open(data.workers.WORKER1);
    });
    it('check ' + data.params.WORKORDER_TCREATE + ' workorder in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
      workersCrudl.verifyWorkorderInList(data.params.WORKER_TCRUDL1, data.workorders.CREATE);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('UPDATE', function() {
    it('update ' + data.params.WORKORDER_TUPDATE1 + ' workorder details', function() {
      workordersCrudl.update(data.params.WORKORDER_TUPDATE1, data.workorders.UPDATE2);
    });
    it('open ' + data.params.WORKORDER_TUPDATE2 + ' workorder', function() { //RAINCATCH-641
      workordersCrudl.open(data.workorders.UPDATE2); // open workorder to see details
    });
    it('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder details', function() { //RAINCATCH-641
      workordersCrudl.expectDetailsToBe(data.workorders.UPDATE2); // verify workorder details
    });
    it('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder in list', function() {
      workordersCrudl.expectToBeInList(data.workorders.UPDATE2);
    });
    it('open ' + data.params.WORKER_TCRUDL2 + ' worker', function() {
      workersCrudl.open(data.workers.WORKER2);
    });
    it('check ' + data.params.WORKORDER_TUPDATE2 + ' workorder in ' + data.params.WORKER_TCRUDL2 + ' worker list', function() {
      workersCrudl.verifyWorkorderInList(data.params.WORKER_TCRUDL2, data.workorders.UPDATE2);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('CANCEL', function() {
    it('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workordersCrudl.open(data.workorders.CANCEL);
    });
    it('press [delete] button', function() {
      workordersCrudl.pressDeleteButton();
    });
    it('press [cancel] button', function() {
      workordersCrudl.pressCancelButton();
    });
    it('check ' + data.params.WORKORDER_TCANCEL + ' workorder in list', function() {
      workordersCrudl.expectToBeInList(data.workorders.CANCEL);
    });
    it('press [new] button', function() {
      workordersCrudl.pressNewButton();
    });
    it('press [cancel] button', function() {
      workordersCrudl.pressNewCancelButton();
    });
    it('check [new] button visible', function() {
      workordersCrudl.expectNewButtonIsPresent();
    });
    it('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workordersCrudl.open(data.workorders.CANCEL);
    });
    it('press [edit] button', function() {
      workordersCrudl.pressEditButton();
    });
    it('press [cancel] button', function() {
      workordersCrudl.pressNewCancelButton();
    });
    it('check ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workordersCrudl.expectDetailsToBe(data.workorders.CANCEL); //RAINCATCH-641
    });
  });

  describe('SEARCH', function() {
    var searched;
    it('search field is visible and ' + data.params.WORKORDER_TSEARCH + 'is searched', function() {
      searched = workordersCrudl.search(data.workorders.SEARCH);
    });
    it('check ' + data.params.WORKORDER_TSEARCH + ' workorder in list', function() {
      workordersCrudl.verifyElementDetailsEqualTo(searched, data.workorders.SEARCH);
    });
    it('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
      workordersCrudl.verifyElementDetailsNotEqualTo(searched, data.workorders.DELETE);
    });
    it('search for all workorders', function() {
      workordersCrudl.searchReset();
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
      workordersCrudl.remove(data.workorders.DELETE);
    });
    it('check ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
      workordersCrudl.expectNotInTheList(data.workorders.DELETE);
    });
    it('check ' + data.params.WORKORDER_TDELETE + ' workorder not in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
      workersCrudl.verifyWorkorderNotInList(data.params.WORKER_TCRUDL1, data.workorders.DELETE);
    });
    xit('mobile App workorder in list', function() {
      // TODO
    });
  });

  describe('CLEANUP', function() {
    it('remove workorders', function() {
      workordersCrudl.remove(data.workorders.CREATE);
      workordersCrudl.remove(data.workorders.CANCEL);
      workordersCrudl.remove(data.workorders.SEARCH);
      workordersCrudl.remove(data.workorders.UPDATE2);
    });
    it('remove workers', function() {
      workersCrudl.remove(data.workers.WORKER1);
      workersCrudl.remove(data.workers.WORKER2);
    });
    it('remove workflows', function() {
      workflowCrudl.remove(data.workflows.WORKFLOW1);
      workflowCrudl.remove(data.workflows.WORKFLOW2);
    });
  });
});