var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

// var cwp = require('../pages/workflow/create.po');
var mwp = require('../pages/workflow/main.po');

var workflowsCrudl = require('../utils/workflow.crudl');
var stepsCrudl = require('../utils/steps.crudl');

var utils = require('../utils/utils');
var data = require('../data/steps.do');

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
    it('create ' + data.params.STEP_TCREATE + ' workflow', function() {
      workflowsCrudl.create(data.workflows.WORKFLOW);
    });
    it('create steps', function() {
      stepsCrudl.addStepToWorkflow(data.workflows.WORKFLOW.title, data.steps.UPDATE1);
      stepsCrudl.addStepToWorkflow(data.workflows.WORKFLOW.title, data.steps.DELETE);
      stepsCrudl.addStepToWorkflow(data.workflows.WORKFLOW.title, data.steps.CANCEL);
    });
  });

  describe('CREATE', function() {
    it('open ' + data.params.WORKFLOW_TCRUDL + ' workflow', function() {
      workflowsCrudl.open(data.workflows.WORKFLOW);
    });
    it('check [Add Step] button is visible', function() {
      expect($(mwp.selectors.stepForm.addStepButton).isPresent()).eventually.to.be.true; //RAINCATCH-705
      $(mwp.selectors.stepForm.addStepButton).click();
    });
    it('verify invalid step fields', function() {
      mwp.commands.stepWarningsAreShown();
    });
    it('add ' + data.params.STEP_TCREATE + 'step to workflow', function() {
      stepsCrudl.addStep(data.steps.CREATE);
    });
    it('verify ' + data.params.STEP_TCREATE + ' step details', function() {
      stepsCrudl.verifyDetails(data.steps.CREATE);
    });
    xit('verify ' + data.params.STEP_TCREATE + ' step in ' + data.params.WORKFLOW_TCRUDL + ' workflow list', function() {
      stepsCrudl.verifyInList(data.steps.UPDATE2);
    });

  });

  describe('UPDATE', function() {
    it('open ' + data.params.WORKFLOW_TCRUDL + ' workflow', function() {
      workflowsCrudl.open(data.workflows.WORKFLOW);
    });
    it('update ' + data.params.STEP_TUPDATE1 + ' step details', function() {
      stepsCrudl.update(data.steps.UPDATE1.name, data.steps.UPDATE2);
    });
    it('verify ' + data.params.STEP_TUPDATE2 + ' step details', function() {
      stepsCrudl.verifyDetails(data.steps.UPDATE2);
    });
    xit('verify ' + data.params.STEP_TUPDATE2 + ' step in ' + data.params.WORKFLOW_TCRUDL + ' workflow list', function() {
      stepsCrudl.verifyInList(data.steps.UPDATE2);
    });
  });

  describe('CANCEL', function() {
    it('open ' + data.params.WORKFLOW_TCRUDL + ' workflow', function() {
      workflowsCrudl.open(data.workflows.WORKFLOW);
    });
    it('press [delete] button on ' + data.params.STEP_TCANCEL + ' step', function() {
      expect(
        element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + data.params.STEP_TCANCEL + '")]]/md-card-actions/button[@aria-label="Delete Step"]')).isPresent()
      ).eventually.to.be.true;
      element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + data.params.STEP_TCANCEL + '")]]/md-card-actions/button[@aria-label="Delete Step"]')).click();
      expect($(mwp.selectors.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(mwp.selectors.cancelButton).click();
      expect($(mwp.selectors.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify test step details', function() {
      stepsCrudl.verifyDetails(data.steps.CANCEL);
    });
    it('press [edit] button', function() {
      expect(
        element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + data.params.STEP_TCANCEL + '")]]/md-card-actions/a[@aria-label="Edit Step"]')).isPresent()
      ).eventually.to.be.true;
      element(by.xpath('//md-card[./md-card-content/workflow-step-detail/h2[contains(text(),"' + data.params.STEP_TCANCEL + '")]]/md-card-actions/a[@aria-label="Edit Step"]')).click();
      expect($(mwp.selectors.closeButton).isPresent()).eventually.to.be.true; // why close button here?
    });
    it('press [cancel] button', function() {
      $(mwp.selectors.closeButton).click(); // why close button here?
      // expect($(mwp.selectors.closeButton).isPresent()).eventually.to.be.false; // should not be visible when was clicked
    });
    it('verify test step details', function() {
      stepsCrudl.verifyDetails(data.steps.CANCEL);
    });
  });

  describe('DELETE', function() {
    it('open ' + data.params.WORKFLOW_TCRUDL + ' workflow', function() {
      workflowsCrudl.open(data.workflows.WORKFLOW);
    });
    it('remove ' + data.params.STEP_TDELETE + ' step', function() {
      stepsCrudl.remove(data.steps.DELETE);
    });
    it('verify ' + data.params.STEP_TDELETE + ' step not in ' + data.params.WORKFLOW_TCRUDL + ' workflow list', function() {
      stepsCrudl.verifyIsNotInTheList(data.steps.DELETE);
    });
  });

  describe('CLEANUP', function() {
    it('remove steps', function() {
      stepsCrudl.remove(data.steps.CREATE);
      stepsCrudl.remove(data.steps.UPDATE2);
      stepsCrudl.remove(data.steps.CANCEL);
    });
    it('remove workflows', function() {
      workflowsCrudl.remove(data.workflows.WORKFLOW);
    });
  });
});