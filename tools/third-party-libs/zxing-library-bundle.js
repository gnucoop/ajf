var cjs = require('rollup-plugin-commonjs');
var node = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'node_modules/@zxing/library/esm/index.js',
  output: {
    amd: {id: '@zxing/library'},
    name: '@zxing/library',
    file: 'node_modules/@zxing/library/zxing-library.umd.js',
    format: 'umd',
    exports: 'named',
    globals: {
      'ts-custom-error': 'ts-custom-error',
    }
  },
  plugins: [
    cjs(),
    node(),
  ],
};

