declare const requirejs: any;

const bundlesBasePath = '/base/ajf/test/';
const nodeModulesBasePath = '/base/ajfdeps/node_modules/';

const paths = {
  '@ionic/core': `${bundlesBasePath}ionic-core.umd`,
  '@ionic/core/loader': `${bundlesBasePath}ionic-core-loader.umd`,
  '@ionic-native/keyboard/ngx': `${bundlesBasePath}ionic-native-keyboard.umd`,
  '@ngx-translate/core': `${nodeModulesBasePath}@ngx-translate/core/bundles/ngx-translate-core.umd`,
  'date-fns': `${bundlesBasePath}date-fns.umd`,
  'debug': `${bundlesBasePath}debug.umd`,
  'esprima': `${nodeModulesBasePath}esprima/esprima`,
  'ionicons': `${bundlesBasePath}ionicons.umd`,
  'ionicons/icons': `${bundlesBasePath}ionicons-icons.umd`,
  'numeral': `${nodeModulesBasePath}numeral/min/numeral.min`,
};

requirejs.config({paths});
