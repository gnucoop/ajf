var cjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'node_modules/numeral/min/numeral.min.js',
  output: {
    amd: {id: 'numeral'},
    name: 'numeral',
    file: 'node_modules/numeral/numeral.umd.js',
    format: 'umd',
    exports: 'named'
  },
  plugins: [
    cjs(),
  ],
};
