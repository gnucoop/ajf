var cjs = require('rollup-plugin-commonjs');
var node = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'node_modules/chart.js/dist/Chart.bundle.js',
  output: {
    amd: {id: 'chart.js'},
    name: 'chart.js',
    file: 'node_modules/chart.js/Chart.umd.js',
    format: 'umd',
    exports: 'named'
  },
  plugins: [
    cjs(),
    node(),
  ],
};
