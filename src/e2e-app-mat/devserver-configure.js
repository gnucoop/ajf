// We need to configure AMD modules which are not named because otherwise "require.js" is not
// able to resolve AMD imports to such modules.

const nodeModulesBasePath = '/base/npm/node_modules/';

require.config({
  paths: {
    '@zxing/library': `/@zxing/library/umd/index.min`,
    'chart': `${nodeModulesBasePath}chart.js/Chart.umd`,
    'chart.piecelabel': `${nodeModulesBasePath}chart.piecelabel.js/build/Chart.PieceLabel.min`,
    'css-element-queries': `${nodeModulesBasePath}css-element-queries/css-element-queries.umd`,
    'date-fns': `${nodeModulesBasePath}date-fns/date-fns.umd`,
    'debug': `${nodeModulesBasePath}debug/debug.umd`,
    'esprima': `${nodeModulesBasePath}esprima/esprima.umd`,
    'leaflet': `${nodeModulesBasePath}leaflet/leaflet.umd`,
    'numeral': `${nodeModulesBasePath}numeral/numeral.umd`,
  }
});

var module = {id: ''};
