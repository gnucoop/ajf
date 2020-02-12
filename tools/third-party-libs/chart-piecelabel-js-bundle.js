var cjs = require('rollup-plugin-commonjs');
var node = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'node_modules/chart.piecelabel.js/src/Chart.PieceLabel.js',
  output: {
    amd: {id: 'chart.piecelabel.js'},
    name: 'chart.piecelabel.js',
    file: 'node_modules/chart.piecelabel.js/Chart.PieceLabel.umd.js',
    format: 'umd',
    exports: 'named',
    globals: {
      'chart.js': 'chart.js',
    }
  },
  plugins: [
    cjs(),
  ],
};
