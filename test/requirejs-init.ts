declare const requirejs: any;

const nodeModulesBasePath = '/base/npm/node_modules/';

const paths = {
  '@ionic/angular': `${nodeModulesBasePath}@ionic/angular/angular.umd`,
  '@ionic/core': `${nodeModulesBasePath}@ionic/core/core.umd`,
  '@ionic/core/loader': `${nodeModulesBasePath}@ionic/core/core-loader.umd`,
  'chart': `${nodeModulesBasePath}chart.js/dist/Chart.bundle`,
  'chart.piecelabel': `${nodeModulesBasePath}chart.piecelabel.js/build/Chart.PieceLabel.min`,
  'css-element-queries': `${nodeModulesBasePath}css-element-queries/css-element-queries.umd`,
  'date-fns': `${nodeModulesBasePath}date-fns/date-fns.umd`,
  'debug': `${nodeModulesBasePath}debug/debug.umd`,
  'esprima': `${nodeModulesBasePath}esprima/esprima`,
  'ionic-selectable': `${nodeModulesBasePath}ionic-selectable/bundles/ionic-selectable.umd.min`,
  'leaflet': `${nodeModulesBasePath}leaflet/dist/leaflet`,
  'numeral': `${nodeModulesBasePath}numeral/min/numeral.min`,
};

requirejs.config({paths, nodeIdCompat: true});
