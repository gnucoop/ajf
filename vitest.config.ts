// Shared Vitest configuration for the `unit-test` targets of the libraries (`runnerConfig` in
// angular.json). The browser is configured here rather than through the builder's `browsers`
// option, which leaves no room for launch options.
import {playwright} from '@vitest/browser-playwright';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      // A visible browser locally, as Karma had; headless under `yarn test:ci`.
      headless: !!process.env['CI_TEST'],
      // Playwright hides the scrollbars of a headless Chromium. Some specs measure the room
      // a classic scrollbar takes, as it does in a desktop browser, so they are kept.
      provider: playwright({launchOptions: {ignoreDefaultArgs: ['--hide-scrollbars']}}),
      instances: [{browser: 'chromium'}],
    },
  },
});
