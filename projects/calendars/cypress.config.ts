import {defineConfig} from 'cypress';

export default defineConfig({
  videosFolder: 'projects/calendars/cypress/videos',
  screenshotsFolder: 'projects/calendars/cypress/screenshots',
  fixturesFolder: 'projects/calendars/cypress/fixtures',
  video: false,
  e2e: {
    specPattern: 'projects/calendars/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'projects/calendars/cypress/support/index.ts',
    baseUrl: 'http://localhost:4200',
  },
});
