var SelectedWorkflowPage = function() {

  var stepFormSelector = 'form[name="workflowStepForm"]';
  var locators = {
    workflowHeader: element(by.css('workflow-detail>md-toolbar>div>h3')),
    workflowDetails: element(by.css('workflow-detail md-card:nth-last-of-type(n+2)')).all(by.css('md-card')), // get all steps but not [Add Step]

    stepForm: {
      self: element(by.css(stepFormSelector)),
      fields: {
        code: element(by.css(stepFormSelector + ' #code')),
        name: element(by.css(stepFormSelector + ' #name')),
        formId: element(by.css(stepFormSelector + ' #formId')),
        form: element(by.css(stepFormSelector + ' #form')),
        view: element(by.css(stepFormSelector + ' #view')),
      },
      dropdowns: {
        // no dropdowns in Step Form
      },
      buttons: {
        add: element(by.css(stepFormSelector + ' button[aria-label="Add step"]')),
        update: element(by.css(stepFormSelector + ' button[aria-label="Update step"]')),
      },
      warnings: {
        code: element(by.css(stepFormSelector + ' #code[aria-invalid="true"]')),
        name: element(by.css(stepFormSelector + ' #name[aria-invalid="true"]'))
      }
    }
  };
  var commands = {
    getDetails: function() {
      return locators.workflowDetails.map(function(listItem) {
        var h2 = listItem.element(by.css('md-card-content>workflow-step-detail>h2')).getText();
        var items = listItem.element(by.css('md-card-content>workflow-step-detail>md-list')).all(by.css('md-list-item'));
        var steps = items.map(function(item) {
          var icon = item.element(by.css('md-icon')).getText();
          var h3 = item.element(by.css('div>h3')).getText();
          var p = item.element(by.css('div>p')).getText();
          return { icon, h3, p };
        });
        return {h2, steps};
      });
    },
    getStepCode: function(details) {
      var stepCode = details.find(function(elem) {
        return elem.steps.p === 'Step code';
      });
      return stepCode;
    },
    getViewTemplate: function(details) {
      var viewTemplate = details.find(function(elem) {
        return elem.steps.p === 'View Template';
      });
      return viewTemplate;
    },
    getFormTemplate: function(details) {
      var formTemplate = details.find(function(elem) {
        return elem.steps.p === 'Form template';
      });
      return formTemplate;
    }
  };

  return {
    locators, commands
  };
};

module.exports = SelectedWorkflowPage();