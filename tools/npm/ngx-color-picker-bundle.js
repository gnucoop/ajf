var cjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'node_modules/ngx-color-picker/dist/index.js',
  external: [
    '@angular/common',
    '@angular/core',
  ],
  output: {
    amd: {id: 'ngx-color-picker'},
    name: 'ngx-color-picker',
    file: 'node_modules/ngx-color-picker/bundles/ngx-color-picker.umd.js',
    format: 'umd',
    exports: 'named',
    globals: {
      '@angular/common': 'ng.common',
      '@angular/core': 'ng.core',
    }
  },
  plugins: [
    cjs(),
  ],
};
