module.exports = {
  projectId: '4b7344',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
 // testFiles: '**/*.{feature,features}',
  testFramework: '@serenity-js/cypress',
  plugins: {
    '@serenity-js/cypress': {
      // configure the Serenity/JS reporting
      outputTarget: 'target/site/serenity',
      screenshotPath: 'target/site/serenity/screenshots',
    },
  },
};
