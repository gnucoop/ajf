declare const requirejs: any;

const bundlesBasePath = '/base/ajf/test/';
const nodeModulesBasePath = '/base/ajfdeps/node_modules/';

const paths = {
  '@ionic/core': `${bundlesBasePath}ionic_core_bundle.umd`,
  '@ionic/core/loader': `${bundlesBasePath}ionic_core_loader_bundle.umd`,
  '@ionic-native/keyboard/ngx': `${bundlesBasePath}ionic_native_keyboard_bundle.umd`,
  '@ngx-translate/core': `${nodeModulesBasePath}@ngx-translate/core/bundles/ngx-translate-core.umd`,
  'date-fns': `${bundlesBasePath}date_fns_bundle.umd`,
  'debug': `${bundlesBasePath}debug_bundle.umd`,
  'esprima': `${nodeModulesBasePath}esprima/esprima`,
  'ionicons': `${bundlesBasePath}ionicons_bundle.umd`,
  'ionicons/icons': `${bundlesBasePath}ionicons_icons_bundle.umd`,
  'numeral': `${nodeModulesBasePath}numeral/min/numeral.min`,
};

requirejs.config({paths});
