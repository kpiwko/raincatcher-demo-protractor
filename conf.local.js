var env = require('./environment.js');

exports.config = {
  // seleniumAddress: env.seleniumAddress,
  framework: 'mocha',
  // spec patterns are relative to this directory.
  specs: [
    'tests/*.spec.js'
  ],

  capabilities: env.capabilities,
  baseUrl: env.baseUrl,

  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    timeout: 600000,
    bail: true,
    watch: true
  }
};
