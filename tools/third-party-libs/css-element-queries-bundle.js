var cjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'node_modules/css-element-queries/index.js',
  output: {
    amd: {id: 'css-element-queries'},
    name: 'css-element-queries',
    file: 'node_modules/css-element-queries/css-element-queries.umd.js',
    format: 'umd',
    exports: 'named'
  },
  plugins: [
    cjs(),
  ],
};
