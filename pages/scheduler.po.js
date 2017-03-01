var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

var SchedulerPage = function() {

  var selectors = {
    header: "//schedule/md-toolbar/div/h3/span[contains(.,'Scheduler')]",
    toolbar: 'schedule md-toolbar.wfm-scheduler-toolbar',
    datePicker: 'md-datepicker[ng-model="ctrl.scheduleDate"]'
  };
  var commands = {
    navigate: function() {
      return browser.get('#/schedule');
    },
    selfCheck: function() {
      expect($(selectors.toolbar).isPresent()).eventually.to.be.true;
      expect($(selectors.datePicker).isPresent()).eventually.to.be.true;
      expect(element(by.xpath(selectors.header)).isPresent()).eventually.to.be.true;
    }
  };

  return {
    selectors, commands
  };
};

module.exports = SchedulerPage();