declare const requirejs: any;

const bundlesBasePath = '/base/ajf/test/';
const nodeModulesBasePath = '/base/ajfdeps/node_modules/';

const paths = {
  '@ionic/core': `${bundlesBasePath}ionic-core.umd`,
  '@ionic/core/loader': `${bundlesBasePath}ionic-core-loader.umd`,
  '@ngx-translate/core': `${nodeModulesBasePath}@ngx-translate/core/bundles/ngx-translate-core.umd`,
  'chart': `${nodeModulesBasePath}chart.js/dist/Chart`,
  'chart.piecelabel': `${nodeModulesBasePath}chart.piecelabel.js/build/Chart.PieceLabel.min`,
  'css-element-queries': `${bundlesBasePath}css-element-queries.umd`,
  'date-fns': `${bundlesBasePath}date-fns.umd`,
  'debug': `${bundlesBasePath}debug.umd`,
  'esprima': `${nodeModulesBasePath}esprima/esprima`,
  'ionicons': `${bundlesBasePath}ionicons.umd`,
  'ionicons/icons': `${bundlesBasePath}ionicons-icons.umd`,
  'leaflet': `${nodeModulesBasePath}leaflet/dist/leaflet`,
  'numeral': `${nodeModulesBasePath}numeral/min/numeral.min`,
};

requirejs.config({paths, nodeIdCompat: true});
