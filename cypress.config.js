const { defineConfig } = require("cypress");

module.exports = defineConfig({
  downloadsFolder: "tests-cypress/downloads",
  fileServerFolder: "tests-cypress",
  fixturesFolder: "tests-cypress/fixtures",
  screenshotsFolder: "tests-cypress/snapshots/actual",
  videosFolder: "tests-cypress/videos",

  trashAssetsBeforeRuns: true,

  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // node event listeners
    },
    supportFile: "tests-cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "tests-cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },

  component: {
    supportFile: "tests-cypress/support/component.js"
  },

  screenshotOnRunFailure: false,
  video: false,
});
