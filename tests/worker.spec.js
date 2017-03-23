var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var lop = require('../pages/login.po');
var scp = require('../pages/scheduler.po');

var cwp = require('../pages/worker/create.po');
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
      cwp.commands.warningsAreShown();
    });
    it('create new ' + data.params.WORKER_TCREATE + ' worker', function() {
      workersCrudl.create(data.workers.CREATE);
    });
    xit('verify ' + data.params.WORKER_TCREATE + ' worker details', function() {
      workersCrudl.verifyDetails(data.workers.CREATE); //RAINCATCH-641
    });
    it('open schedule page', function() { //BUG worker is not visile in list until you open page again
      scp.commands.sideClick();
      scp.commands.selfCheck();
    });
    it('open workers page', function() { //BUG worker is not visile in list until you open page again
      mwp.commands.sideClick(); // check after double press if only one worker added and warning is visible
      mwp.commands.selfCheck();
    });
    it('verify ' + data.params.WORKER_TCREATE + ' worker in list', function() {
      workersCrudl.verifyInList(data.workers.CREATE);
    });
    xit('mobile App login as test worker', function() {
      // TODO
    });
  });

  describe('UPDATE', function() {
    it('open schedule page', function() { //BUG worker is not visile in list until you open page again
      scp.commands.sideClick();
      scp.commands.selfCheck();
    });
    it('open workers page', function() { //BUG worker is not visile in list until you open page again
      mwp.commands.sideClick(); // check after double press if only one worker added and warning is visible
      mwp.commands.selfCheck();
    });
    it('update ' + data.params.WORKER_TUPDATE1 + ' worker details', function() {
      workersCrudl.update(data.params.WORKER_TUPDATE1, data.workers.UPDATE2);
    });
    xit('verify ' + data.params.WORKER_TUPDATE2 + ' worker details', function() {
      workersCrudl.verifyDetails(data.workers.UPDATE2); //RAINCATCH-641
    });
    it('verify ' + data.params.WORKER_TUPDATE2 + ' worker in list', function() {
      workersCrudl.verifyInList(data.workers.UPDATE2);
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
      expect($(mwp.selectors.deleteButton).isPresent()).eventually.to.be.true;
      $(mwp.selectors.deleteButton).click();
      expect($(mwp.selectors.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(mwp.selectors.cancelButton).click();
      expect($(mwp.selectors.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify ' + data.params.WORKER_TCANCEL + ' worker in list', function() {
      workersCrudl.verifyInList(data.workers.CANCEL);
    });
    it('open workers page', function() { //BUG worker is not visile in list until you open page again
      mwp.commands.sideClick(); // check after double press if only one worker added and warning is visible
      mwp.commands.selfCheck();
    });
    it('press [new] button', function() {
      expect($(mwp.selectors.newButton).isPresent()).eventually.to.be.true;
      $(mwp.selectors.newButton).click();
      expect($(cwp.selectors.workerForm.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(cwp.selectors.workerForm.cancelButton).click();
      expect($(cwp.selectors.workerForm.cancelButton).isPresent()).eventually.to.be.false;
    });
    it('verify [new] button visible', function() {
      expect($(mwp.selectors.newButton).isPresent()).eventually.to.be.true;
    });
    it('open ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workersCrudl.open(data.workers.CANCEL);
    });
    it('press [edit] button', function() {
      expect($(mwp.selectors.editButton).isPresent()).eventually.to.be.true;
      $(mwp.selectors.editButton).click();
      expect($(cwp.selectors.workerForm.cancelButton).isPresent()).eventually.to.be.true;
    });
    it('press [cancel] button', function() {
      $(cwp.selectors.workerForm.cancelButton).click();
      expect($(cwp.selectors.workerForm.cancelButton).isPresent()).eventually.to.be.false;
    });
    xit('verify ' + data.params.WORKER_TCANCEL + ' worker details', function() {
      workersCrudl.verifyDetails(data.workers.CANCEL); //RAINCATCH-641
    });
  });

  describe('SEARCH', function() {
    it('open schedule page', function() { //BUG worker is not visile in list until you open page again
      scp.commands.sideClick();
      scp.commands.selfCheck();
    });
    it('open workers page', function() { //BUG worker is not visile in list until you open page again
      mwp.commands.sideClick(); // check after double press if only one worker added and warning is visible
      mwp.commands.selfCheck();
    });
    it('search field is visible', function() {
      expect($(mwp.selectors.searchField).isPresent()).eventually.to.be.true;
      $(mwp.selectors.searchField).sendKeys(data.params.WORKER_TSEARCH);
      browser.sleep(2000); // wait 2 secs to do search
    });
    it('verify ' + data.params.WORKER_TSEARCH + ' worker in list', function() {
      workersCrudl.verifyInList(data.workers.SEARCH);
    });
    it('verify ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workersCrudl.verifyNotInList(data.workers.DELETE);
    });
    it('clean search text', function() {
      $(mwp.selectors.searchField).clear(); // clear search text
      browser.sleep(2000); // wait 2 secs to do search
    });
  });

  describe('DELETE', function() {
    it('remove ' + data.params.WORKER_TDELETE + ' worker', function() {
      workersCrudl.remove(data.workers.DELETE);
    });
    it('verify ' + data.params.WORKER_TDELETE + ' worker not in list', function() {
      workersCrudl.verifyNotInList(data.workers.DELETE);
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