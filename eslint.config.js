// @ts-check

// Allows us to bring in the recommended core rules from eslint itself
const eslint = require('@eslint/js');

// Allows us to use the typed utility for our config, and to bring in the recommended rules for TypeScript projects from typescript-eslint
const tseslint = require('typescript-eslint');

// Allows us to bring in the recommended rules for Angular projects from angular-eslint
const angular = require('angular-eslint');

// Allows us to include the browser globals (eg. "console", "localStorage" etc.)
const globals = require('globals');

// Export our config array, which is composed together thanks to the typed utility function from typescript-eslint
module.exports = tseslint.config(
  {
    languageOptions: {globals: globals.browser},
    // Everything in this config object targets our TypeScript files (Components, Directives, Pipes etc)
    files: ['**/*.ts'],
    ignores: ['**/cypress/**', '**/*.spec.ts'],
    extends: [
      // Apply the recommended Angular rules
      ...angular.configs.tsRecommended,
      // Apply the recommended core rules
      // eslint.configs.recommended,
      // Apply the recommended TypeScript rules
      // ...tseslint.configs.recommended,
      // Optionally apply stylistic rules from typescript-eslint that improve code consistency
      // ...tseslint.configs.stylistic,
    ],
    plugins: {'@typescript-eslint': tseslint.plugin},
    // Set the custom processor which will allow us to have our inline Component templates extracted
    // and treated as if they are HTML files (and therefore have the .html config below applied to them)
    processor: angular.processInlineTemplates,
    // Override specific rules for TypeScript files (these will take priority over the extended configs above)
    'rules': {
      '@angular-eslint/directive-class-suffix': 0,
      '@angular-eslint/directive-selector': [
        'error',
        {
          'type': 'attribute',
          'prefix': 'ajf',
          'style': 'camelCase',
        },
      ],
      '@angular-eslint/component-class-suffix': 0,
      '@angular-eslint/component-selector': [
        'error',
        {
          'type': 'element',
          'prefix': 'ajf',
          'style': 'kebab-case',
        },
      ],
      '@angular-eslint/no-output-native': 0,
      'object-curly-spacing': ['error', 'never'],
      'no-case-declarations': 'off',
      'no-useless-escape': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'ignoreRestSiblings': true,
        },
      ],
    },
  },
  {
    // Everything in this config object targets our HTML files (external templates,
    // and inline templates as long as we have the `processor` set on our TypeScript config above)
    files: ['**/*.html'],
    extends: [
      // Apply the recommended Angular template rules
      ...angular.configs.templateRecommended,
      // Apply the Angular template rules which focus on accessibility of our apps
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/alt-text': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/no-autofocus': 'off',
      '@angular-eslint/template/elements-content': 'off',
    },
  },
);
