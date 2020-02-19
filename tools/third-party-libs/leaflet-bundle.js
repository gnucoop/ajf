var cjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'node_modules/leaflet/dist/leaflet.js',
  output: {
    amd: {id: 'leaflet'},
    name: 'leaflet',
    file: 'node_modules/leaflet/leaflet.umd.js',
    format: 'umd',
    exports: 'named'
  },
  plugins: [
    cjs(),
  ],
};
