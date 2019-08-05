declare const requirejs: any;

const nodeModulesBasePath = '/base/npm/node_modules/';

const paths = {
  '@gic/angular': `${nodeModulesBasePath}@gic/angular/angular.umd`,
  '@gic/core': `${nodeModulesBasePath}@gic/core/core.umd`,
  '@gic/core/loader': `${nodeModulesBasePath}@gic/core/core-loader.umd`,
  '@ionic/angular': `${nodeModulesBasePath}@ionic/angular/angular.umd`,
  '@ionic/core': `${nodeModulesBasePath}@ionic/core/core.umd`,
  '@ionic/core/loader': `${nodeModulesBasePath}@ionic/core/core-loader.umd`,
  'chart': `${nodeModulesBasePath}chart.js/Chart.umd`,
  'chart.piecelabel': `${nodeModulesBasePath}chart.piecelabel.js/build/Chart.PieceLabel.min`,
  'css-element-queries': `${nodeModulesBasePath}css-element-queries/css-element-queries.umd`,
  'date-fns': `${nodeModulesBasePath}date-fns/date-fns.umd`,
  'debug': `${nodeModulesBasePath}debug/debug.umd`,
  'esprima': `${nodeModulesBasePath}esprima/esprima.umd`,
  'leaflet': `${nodeModulesBasePath}leaflet/leaflet.umd`,
  'numeral': `${nodeModulesBasePath}numeral/numeral.umd`,
};

requirejs.config({paths, nodeIdCompat: true});
