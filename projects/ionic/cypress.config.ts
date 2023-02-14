import {defineConfig} from 'cypress';

export default defineConfig({
  videosFolder: 'projects/ionic/cypress/videos',
  screenshotsFolder: 'projects/ionic/cypress/screenshots',
  fixturesFolder: 'projects/ionic/cypress/fixtures',
  video: false,
  e2e: {
    specPattern: 'projects/ionic/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'projects/ionic/cypress/support/index.ts',
    baseUrl: 'http://localhost:4200',
  },
});
