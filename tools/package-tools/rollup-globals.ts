import {join} from 'path';
import {getSubdirectoryNames} from './secondary-entry-points';
import {buildConfig} from './build-config';

/** Method that converts dash-case strings to a camel-based string. */
export const dashCaseToCamelCase =
  (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

/** Generates rollup entry point mappings for the given package and entry points. */
function generateRollupEntryPoints(packageName: string, entryPoints: string[]):
    {[k: string]: string} {
  return entryPoints.reduce((globals: {[k: string]: string}, entryPoint: string) => {
    globals[`@ajf/${packageName}/${entryPoint}`] =
        `ajf.${dashCaseToCamelCase(packageName)}.${dashCaseToCamelCase(entryPoint)}`;
    return globals;
  }, {});
}

/** List of potential secondary entry-points for the core package. */
const coreSecondaryEntryPoints = getSubdirectoryNames(join(buildConfig.packagesDir, 'core'));

/** List of potential secondary entry-points for the material package. */
const ionSecondaryEntryPoints = getSubdirectoryNames(join(buildConfig.packagesDir, 'ionic'));

/** List of potential secondary entry-points for the material package. */
const matSecondaryEntryPoints = getSubdirectoryNames(join(buildConfig.packagesDir, 'material'));

/** Object with all core entry points in the format of Rollup globals. */
const rollupCoreEntryPoints = generateRollupEntryPoints('core', coreSecondaryEntryPoints);

/** Object with all material entry points in the format of Rollup globals. */
const rollupIonEntryPoints = generateRollupEntryPoints('ionic', ionSecondaryEntryPoints);

/** Object with all material entry points in the format of Rollup globals. */
const rollupMatEntryPoints = generateRollupEntryPoints('material', matSecondaryEntryPoints);

/** Map of globals that are used inside of the different packages. */
export const rollupGlobals = {
  'tslib': 'tslib',

  '@angular/animations': 'ng.animations',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
  '@angular/cdk/collections': 'ng.cdk.collections',
  '@angular/common': 'ng.common',
  '@angular/core': 'ng.core',
  '@angular/core/testing': 'ng.core.testing',
  '@angular/forms': 'ng.forms',
  '@angular/material/button': 'ng.material.button',
  '@angular/material/button-toggle': 'ng.material.buttonToggle',
  '@angular/material/card': 'ng.material.card',
  '@angular/material/checkbox': 'ng.material.checkbox',
  '@angular/material/dialog': 'ng.material.dialog',
  '@angular/material/form-field': 'ng.material.formField',
  '@angular/material/grid-list': 'ng.material.gridList',
  '@angular/material/icon': 'ng.material.icon',
  '@angular/material/input': 'ng.material.input',
  '@angular/material/list': 'ng.material.list',
  '@angular/material/menu': 'ng.material.menu',
  '@angular/material/radio': 'ng.material.radio',
  '@angular/material/select': 'ng.material.select',
  '@angular/material/sidenav': 'ng.material.sidenav',
  '@angular/material/slide-toggle': 'ng.material.slideToggle',
  '@angular/material/slider': 'ng.material.slider',
  '@angular/material/table': 'ng.material.table',
  '@angular/material/tabs': 'ng.material.tabs',
  '@angular/material/toolbar': 'ng.material.toolbar',
  '@angular/material/tooltip': 'ng.material.tooltip',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/router': 'ng.router',

  '@ionic/angular': 'ionic.angular',
  'ionic-selectable': 'ionicSelectable',

  '@ngx-translate/core': 'ngxt.core',
  '@ngx-translate/http-loader': 'ngxt.httpLoader',

  'chart.js': 'chartJs',
  'chart.piecelabel.js': 'chartPiecelabel',
  'date-fns': 'dateFns',
  'debug': 'debug',
  'esprima': 'esprima',
  'leaflet': 'leaflet',
  'ngx-dnd': 'ngxDnd',
  'ngx-color-picker': 'ngxColorPicker',
  'numeral': 'numeral',
  'quill': 'quill',
  'url-parse': 'urlParse',

  // Some packages are not really needed for the UMD bundles, but for the missingRollupGlobals rule.
  '@ajf/core': 'ajf.core',
  '@ajf/material': 'ajf.material',

  // Include secondary entry-points of the core and material packages
  ...rollupCoreEntryPoints,
  ...rollupIonEntryPoints,
  ...rollupMatEntryPoints,

  'rxjs': 'rxjs',
  'rxjs/operators': 'rxjs.operators',
};
