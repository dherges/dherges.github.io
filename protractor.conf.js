// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  allScriptsTimeout: 11000,
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',

  // Use a custom framework adapter and set its relative path
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  // Specs here are the cucumber feature files
  specs: [
    './e2e/features/*.feature'
  ],

  // cucumber command line options
  cucumberOpts: {
    // require step definition files before executing features
    require: ['./e2e/steps/**/*.ts'],
    // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    tags: [],
    // <boolean> fail if there are any undefined or pending steps
    strict: true,
    // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    format: [
      'pretty',
      'pretty:e2e/reports/summary.txt',
      'json:e2e/reports/summary.json'
    ],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    compiler: []
  },

  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
  }
};
