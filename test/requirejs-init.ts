declare const requirejs: any;

const bundlesBasePath = '/base/ajf/test/';
const nodeModulesBasePath = '/base/ajfdeps/node_modules/';

const paths = {
  'date-fns': `${bundlesBasePath}date_fns_bundle.umd`,
  debug: `${bundlesBasePath}debug_bundle.umd`,
  esprima: `${nodeModulesBasePath}esprima/esprima`,
  numeral: `${nodeModulesBasePath}numeral/min/numeral.min`
};

requirejs.config({paths});
