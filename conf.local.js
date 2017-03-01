var env = require('./environment.js');

// A small suite to make sure the mocha framework works.
exports.config = {
//  seleniumAddress: env.seleniumAddress,
  framework: 'mocha',
  // Spec patterns are relative to this directory.
  specs: [
    'tests/*-spec.js'
  ],

  capabilities: env.capabilities,

  baseUrl: env.baseUrl,

  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec',
    timeout: 30000,
    bail: true,
    watch: true
  }
};
