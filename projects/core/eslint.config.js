// @ts-check

// Allows us to use the typed utility for our config
const tseslint = require('typescript-eslint');

// Require our workspace root level config and extend from it
const rootConfig = require('../../eslint.config.js');

module.exports = tseslint.config(
  // Apply the root config first
  ...rootConfig,
  {
    // Any project level overrides or additional rules for TypeScript files can go here
    // (we don't need to extend from any typescript-eslint or angular-eslint configs because
    // we already applied the rootConfig above which has them)
    files: ['**/*.ts'],
    'rules': {},
  },
  {
    // Any project level overrides or additional rules for HTML files can go here
    // (we don't need to extend from any angular-eslint configs because
    // we already applied the rootConfig above which has them)
    files: ['**/*.html'],
    rules: {},
  },
);
