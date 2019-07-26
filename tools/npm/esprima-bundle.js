var cjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'node_modules/esprima/dist/esprima.js',
  output: {
    amd: {id: 'esprima'},
    name: 'esprima',
    file: 'node_modules/esprima/esprima.umd.js',
    format: 'umd',
    exports: 'named'
  },
  plugins: [
    cjs(),
  ],
};
