var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

var cwp = require('../pages/workflow/create.po');
var mwp = require('../pages/workflow/main.po');

var workflowsCrudl = require('../utils/workflow.crudl');

var utils = require('../utils/utils');
var data = require('../data/workflows.do');

describe('Workflow E2E', function() {

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
    it('create workflows', function() {
      workflowsCrudl.create(data.workflows.UPDATE1);
      workflowsCrudl.create(data.workflows.DELETE);
      workflowsCrudl.create(data.workflows.CANCEL);
      workflowsCrudl.create(data.workflows.SEARCH);
    });
  });

  describe('CREATE', function() {

    it('create an empty{} workflow', function() {
      workflowsCrudl.create({}, true);
    });
    it('required field warinigs shown', function() {
      cwp.commands.warningsAreShown();
    });
    it('create ' + data.params.WORKFLOW_TCREATE + ' workflow', function() {
      workflowsCrudl.create(data.workflows.CREATE);
    });
    it('verify ' + data.params.WORKFLOW_TCREATE + ' workflow details', function() {
      workflowsCrudl.verifyDetails(data.workflows.CREATE);
    });
    it('verify ' + data.params.WORKFLOW_TCREATE + ' workflow in list', function() {
      workflowsCrudl.verifyInList(data.workflows.CREATE);
    });
    xit('verify ' + data.params.WORKFLOW_TCREATE + ' in workorder form', function() {
      // TODO
    });
  });

  describe('UPDATE', function() {
    it('update ' + data.params.WORKFLOW_TUPDATE1 + ' workflow details', function() {
      workflowsCrudl.update(data.params.WORKFLOW_TUPDATE1, data.workflows.UPDATE2);
    });
    it('verify ' + data.params.WORKFLOW_TUPDATE2 + ' workflow details', function() {
      workflowsCrudl.verifyDetails(data.workflows.UPDATE2);
    });
    it('verify ' + data.params.WORKFLOW_TUPDATE + ' workorder in list', function() {
      workflowsCrudl.verifyInList(data.workflows.UPDATE2);
    });
  });
  describe('CANCEL', function() {
    it('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowsCrudl.open(data.workflows.CANCEL);
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
    it('verify ' + data.params.WORKFLOW_TCANCEL + ' workflow in list', function() {
      workflowsCrudl.verifyInList(data.workflows.CANCEL);
    });
    it('open workflows page', function() {
      mwp.commands.sideClick();
      mwp.commands.selfCheck();
    });
    it('press [new] button', function() {
      expect($(mwp.selectors.newButton).isPresent()).eventually.to.be.true;
      $(mwp.selectors.newButton).click();
      expect($(cwp.selectors.workflowForm.cancelButton).isPresent()).eventually.to.be.true;
    });
    xit('press [cancel] button', function() { // RAINCATCH-651 cancel button does not cancel operation
      $(cwp.selectors.workflowForm.cancelButton).click();
      expect($(cwp.selectors.workflowForm.cancelButton).isPresent()).eventually.to.be.false;
    });
    xit('verify [new] button visible', function() { // RAINCATCH-651 cancel button does not cancel operation
      expect($(mwp.selectors.newButton).isPresent()).eventually.to.be.true;
    });
    it('open ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowsCrudl.open(data.workflows.CANCEL);
    });
    xit('press [edit] button', function() { // RAINCATCH-651 cancel button does not cancel operation
      expect($(mwp.selectors.editButton).isPresent()).eventually.to.be.true;
      $(mwp.selectors.editButton).click();
      expect($(cwp.selectors.workflowForm.cancelButton).isPresent()).eventually.to.be.true;
    });
    xit('press [cancel] button', function() { // RAINCATCH-651 cancel button does not cancel operation
      $(cwp.selectors.workflowForm.cancelButton).click();
      expect($(cwp.selectors.workflowForm.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify ' + data.params.WORKFLOW_TCANCEL + ' workflow details', function() {
      workflowsCrudl.verifyDetails(data.workflows.CANCEL);
    });
  });

  describe('SEARCH', function() {
    it('open workflows page', function() {
      mwp.commands.sideClick();
      mwp.commands.selfCheck();
    });
    it('search field is visible', function() {
      expect($(mwp.selectors.searchField).isPresent()).eventually.to.be.true;
      $(mwp.selectors.searchField).sendKeys(data.params.WORKFLOW_TSEARCH);
      browser.sleep(2000); // wait 2 secs to do search
    });
    it('verify ' + data.params.WORKFLOW_TSEARCH + ' workflow in list', function() {
      workflowsCrudl.verifyInList(data.workflows.SEARCH);
    });
    it('verify ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowsCrudl.verifyNotInList(data.workflows.DELETE);
    });
    it('clean search text', function() {
      $(mwp.selectors.searchField).clear(); // clear search text
      browser.sleep(2000); // wait 2 secs to list all
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.WORKFLOW_TDELETE + ' workflow', function() {
      workflowsCrudl.remove(data.workflows.DELETE);
    });
    it('verify ' + data.params.WORKFLOW_TDELETE + ' workflow not in list', function() {
      workflowsCrudl.verifyNotInList(data.workflows.DELETE);
    });
    xit('verify ' + data.params.WORKFLOW_TDELETE + ' not in workorder form', function() {
      // TODO
    });
  });

  describe('CLEANUP', function() {
    it('remove workflows', function() {
      workflowsCrudl.remove(data.workflows.CREATE);
      workflowsCrudl.remove(data.workflows.UPDATE2);
      workflowsCrudl.remove(data.workflows.CANCEL);
      workflowsCrudl.remove(data.workflows.SEARCH);
    });
  });

});