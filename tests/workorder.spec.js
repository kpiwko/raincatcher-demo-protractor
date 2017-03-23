var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

var cwp = require('../pages/workorder/create.po');
var mwp = require('../pages/workorder/main.po');

var mwrkp = require('../pages/worker/main.po');

var workordersCrudl = require('../utils/workorder.crudl');
var workersCrudl = require('../utils/worker.crudl');
var workflowCrudl = require('../utils/workflow.crudl');

var utils = require('../utils/utils');
var data = require('../data/workorders.do');

describe('Workorder E2E', function() {

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
    it('required field warinigs shown', function() {
      cwp.commands.warningsAreShown();
    });
    it('create new ' + data.params.WORKORDER_TCREATE + ' workorder', function() {
      workordersCrudl.create(data.workorders.CREATE);
    });
    xit('verify ' + data.params.WORKORDER_TCREATE + ' workorder details', function() {
      workordersCrudl.verifyDetails(data.workorders.CREATE); //RAINCATCH-641
    });
    it('verify ' + data.params.WORKORDER_TCREATE + ' workorder in list', function() {
      workordersCrudl.verifyInList(data.workorders.CREATE);
    });
    it('open workers page', function() {
      mwrkp.commands.sideClick();
      mwrkp.commands.selfCheck();
    });
    it('select ' + data.params.WORKER_TCRUDL1 + ' worker', function() {
      workersCrudl.open(data.workers.WORKER1);
    });
    it('verify ' + data.params.WORKORDER_TCREATE + ' workorder in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
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
    xit('verify ' + data.params.WORKORDER_TUPDATE2 + ' workorder details', function() {
      workordersCrudl.verifyDetails(data.workorders.UPDATE2); //RAINCATCH-641
    });
    it('verify ' + data.params.WORKORDER_TUPDATE2 + ' workorder in list', function() {
      workordersCrudl.verifyInList(data.workorders.UPDATE2);
    });
    it('open workers page', function() {
      mwrkp.commands.sideClick();
      mwrkp.commands.selfCheck();
    });
    it('open ' + data.params.WORKER_TCRUDL2 + ' worker', function() {
      workersCrudl.open(data.workers.WORKER2);
    });
    it('verify ' + data.params.WORKORDER_TUPDATE2 + ' workorder in ' + data.params.WORKER_TCRUDL2 + ' worker list', function() {
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
      expect($(mwp.selectors.deleteButton).isPresent()).eventually.to.be.true;
      $(mwp.selectors.deleteButton).click();
      expect($(mwp.selectors.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(mwp.selectors.cancelButton).click();
      expect($(mwp.selectors.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify ' + data.params.WORKORDER_TCANCEL + ' workorder in list', function() {
      workordersCrudl.verifyInList(data.workorders.CANCEL);
    });
    it('press [new] button', function() {
      expect($(mwp.selectors.newButton).isPresent()).eventually.to.be.true;
      $(mwp.selectors.newButton).click();
      expect($(cwp.selectors.workorderForm.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(cwp.selectors.workorderForm.cancelButton).click();
      expect($(cwp.selectors.workorderForm.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify [new] button visible', function() {
      expect($(mwp.selectors.newButton).isPresent()).eventually.to.be.true;
    });
    it('open ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workordersCrudl.open(data.workorders.CANCEL);
    });
    it('press [edit] button', function() {
      expect($(mwp.selectors.editButton).isPresent()).eventually.to.be.true;
      $(mwp.selectors.editButton).click();
      expect($(cwp.selectors.workorderForm.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(cwp.selectors.workorderForm.cancelButton).click();
      expect($(cwp.selectors.workorderForm.cancelButton).isPresent()).eventually.to.be.false;
    });
    xit('verify ' + data.params.WORKORDER_TCANCEL + ' workorder details', function() {
      workordersCrudl.verifyDetails(data.workorders.CANCEL); //RAINCATCH-641
    });
  });

  describe('SEARCH', function() {
    it('open workorders page', function() {
      mwp.commands.sideClick();
      mwp.commands.selfCheck();
    });
    it('search field is visible and ' + data.params.WORKORDER_TSEARCH + 'is searched', function() {
      expect($(mwp.selectors.searchField).isPresent()).eventually.to.be.true;
      $(mwp.selectors.searchField).sendKeys(data.params.WORKORDER_TSEARCH);
      browser.sleep(2000); // wait 2 secs to do search
    });
    it('verify ' + data.params.WORKORDER_TSEARCH + ' workorder in list', function() {
      workordersCrudl.verifyInList(data.workorders.SEARCH);
    });
    it('verify ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
      workordersCrudl.verifyNotInList(data.workorders.DELETE);
    });
    it('clean search text', function() {
      $(mwp.selectors.searchField).clear(); // clear search text
      browser.sleep(2000); // wait 2 secs to do search
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.WORKORDER_TDELETE + ' workorder', function() {
      workordersCrudl.remove(data.workorders.DELETE);
    });
    it('verify ' + data.params.WORKORDER_TDELETE + ' workorder not in list', function() {
      workordersCrudl.verifyNotInList(data.workorders.DELETE);
    });
    it('verify workorders page', function() {
      mwrkp.commands.sideClick();
      mwrkp.commands.selfCheck();
    });
    it('verify ' + data.params.WORKORDER_TDELETE + ' workorder not in ' + data.params.WORKER_TCRUDL1 + ' worker list', function() {
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