var env = require('./environment.js');
exports.config = {
  // seleniumAddress: env.seleniumAddress,
  allScriptsTimeout: env.allScriptsTimeout,
  baseUrl: env.baseUrl,
  capabilities: env.capabilities,

  framework: 'mocha',

  // spec patterns are relative to this directory.
  specs: [
    'tests/*.spec.js'
  ],

  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    slow: env.slowThreshold,
    timeout: env.mochaTimeout,
    bail: true,
    watch: true
  },

  onPrepare: function setup() {
    return browser.driver.executeScript(function() {
      return {
        width: window.screen.availWidth,
        height: window.screen.availHeight
      };
    }).then(function(result) {
      console.log('Browser Max Window Size', result);
      browser.driver.manage().timeouts().pageLoadTimeout(env.defaultPageLoadTimeout);
      // browser.driver.manage().timeouts().implicitlyWait(env.defaultImplicitWait);
      // browser.driver.manage().window().maximize();
      // browser.driver.manage().window().setSize(result.width, result.height);
    }).then(function() { // setup expect as global
      var chai = require('chai');
      var chaiAsPromised = require('chai-as-promised');
      chai.use(chaiAsPromised);
      global.expect = chai.expect;
    });
  }
};
