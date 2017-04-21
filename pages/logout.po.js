var LogOutPage = function() {

  /**
   *  The complete set of locators associated with the logout page
   */
  var locators = {
    logOutButton: element(by.css('button[aria-label="Log out"]')),
    defaultMessage: element(by.css('p.md-body-1'))
  };

  /**
   * Commands associated with logout page
   */
  var commands = {
    clicklogOutButton: function() {
      locators.logOutButton.click();
    }
  };

  /**
   * Default values on logout page
   */
  var defaultValues = {
    defaultMessage: 'Trouble logging in? Contact the switchboard.'
  };

  return {
    locators, commands, defaultValues
  };
};

module.exports = LogOutPage();
