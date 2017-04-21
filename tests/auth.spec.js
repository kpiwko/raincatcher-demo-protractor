var constants = require('../utils/constants');
var authUtils = require('../utils/auth.utils');

describe('Portal and Client Authentication Testing', function() {
  describe('Portal Authentication Tests', function() {
    describe('Testing Login to Portal', function() {
      it('should login to portal', function() {
        authUtils.loginPortal(constants.auth.usernames.TREVER_SMITH,
          constants.auth.DEFAULT_PASSWORD);
      });

      it('should check login was successful', function() {
        authUtils.checkPortalLoginWasSuccessful();
      });
    });

    describe('Testing Logout of Portal', function() {
      it('should log out of portal', function() {
        authUtils.logoutPortal();
      });

      it('should check logout was successful', function() {
        authUtils.checkPortalLogoutWasSuccessful();
      });
    });

    //TODO - move login.spec.js tests here when refactor of login.po is complete
  });

  // TODO - add authentication for client
  // describe('Client Authentication Tests', function() {
  //
  // });
});