import {defineConfig} from 'cypress';

export default defineConfig({
  videosFolder: 'projects/core/cypress/videos',
  screenshotsFolder: 'projects/core/cypress/screenshots',
  fixturesFolder: 'projects/core/cypress/fixtures',
  video: false,
  e2e: {
    specPattern: 'projects/core/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'projects/core/cypress/support/index.ts',
    baseUrl: 'http://localhost:4200',
  },
});
