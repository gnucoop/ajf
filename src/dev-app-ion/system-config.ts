/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

/** Type declaration for ambient System. */
declare const System: any;

// Configure the base path and map the different node packages.
System.config({
  paths: {
    'node:*': 'node_modules/*',
    'bundles:*': 'bundles/*'
  },
  map: {
    'traceur': 'node:traceur/bin/traceur.js',

    'main': 'main.js',

    'chart.js': 'node:chart.js/Chart.umd.js',
    'chart.piecelabel.js': 'node:chart.piecelabel.js/build/Chart.PieceLabel.min.js',
    'css-element-queries': 'node:css-element-queries/css-element-queries.umd.js',
    'date-fns': 'node:date-fns/date-fns.umd.js',
    'debug': 'node:debug/debug.umd.js',
    'esprima': 'node:esprima/esprima.umd.js',
    'leaflet': 'node:leaflet/leaflet.umd.js',
    'numeral': 'node:numeral/numeral.umd.js',
    'tslib': 'node:tslib/tslib.js',
    'url-parse': 'node:url-parse/dist/url-parse.min.js',
    'rxjs': 'node:rxjs',

    // Angular specific mappings.
    '@angular/animations': 'node:@angular/animations/bundles/animations.umd.js',
    '@angular/cdk/bidi': 'node:@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': 'node:@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/collections': 'node:@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/cdk/keycodes': 'node:@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/overlay': 'node:@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/platform': 'node:@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': 'node:@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/scrolling': 'node:@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/core': 'node:@angular/core/bundles/core.umd.js',
    '@angular/common': 'node:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'node:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'node:@angular/compiler/bundles/compiler.umd.js',
    '@angular/elements': 'node:@angular/elements/bundles/elements.umd.js',
    '@angular/forms': 'node:@angular/forms/bundles/forms.umd.js',
    '@angular/router': 'node:@angular/router/bundles/router.umd.js',
    '@angular/animations/browser': 'node:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations':
      'node:@angular/platform-browser/bundles/platform-browser-animations.umd',
    '@angular/platform-browser':
      'node:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic':
      'node:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

    '@gic/core': 'node:@ionic/core/core.umd.js',
    '@gic/core/loader': 'node:@gic/core/core-loader.umd.js',
    '@gic/angular': 'node:@gic/angular/angular.umd.js',
    '@ionic/core': 'node:@ionic/core/core.umd.js',
    '@ionic/core/loader': 'node:@ionic/core/core-loader.umd.js',
    '@ionic/angular': 'node:@ionic/angular/angular.umd.js',

    '@ngx-translate/core': 'node:@ngx-translate/core/bundles/ngx-translate-core.umd.js',
    '@ngx-translate/http-loader':
      'node:@ngx-translate/http-loader/bundles/ngx-translate-http-loader.umd.js',

    '@ajf/core': 'dist/packages/core/index.js',
    '@ajf/ionic': 'dist/packages/ionic/index.js',
    '@ajf/ionic-examples': 'dist/packages/ionic-examples/index.js',

    '@ajf/core/calendar': 'dist/packages/core/calendar/index.js',
    '@ajf/core/chart': 'dist/packages/core/chart/index.js',
    '@ajf/core/checkbox-group': 'dist/packages/core/checkbox-group/index.js',
    '@ajf/core/common': 'dist/packages/core/common/index.js',
    '@ajf/core/forms': 'dist/packages/core/forms/index.js',
    '@ajf/core/image': 'dist/packages/core/image/index.js',
    '@ajf/core/map': 'dist/packages/core/map/index.js',
    '@ajf/core/models': 'dist/packages/core/models/index.js',
    '@ajf/core/node-icon': 'dist/packages/core/node-icon/index.js',
    '@ajf/core/page-break': 'dist/packages/core/page-break/index.js',
    '@ajf/core/page-slider': 'dist/packages/core/page-slider/index.js',
    '@ajf/core/reports': 'dist/packages/core/reports/index.js',
    '@ajf/core/table': 'dist/packages/core/table/index.js',
    '@ajf/core/time': 'dist/packages/core/time/index.js',
    '@ajf/core/text': 'dist/packages/core/text/index.js',
    '@ajf/core/utils': 'dist/packages/core/utils/index.js',
    '@ajf/ionic/calendar': 'dist/packages/ionic/calendar/index.js',
    '@ajf/ionic/checkbox-group': 'dist/packages/ionic/checkbox-group/index.js',
    '@ajf/ionic/forms': 'dist/packages/ionic/forms/index.js',
    '@ajf/ionic/image': 'dist/packages/ionic/image/index.js',
    '@ajf/ionic/node-icon': 'dist/packages/ionic/node-icon/index.js',
    '@ajf/ionic/page-slider': 'dist/packages/ionic/page-slider/index.js',
    '@ajf/ionic/reports': 'dist/packages/ionic/reports/index.js',
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': {main: 'index'},
    'rxjs/operators': {main: 'index'},

    // Set the default extension for the root package, because otherwise the dev-app-map can't
    // be built within the production mode. Due to missing file extensions.
    '.': {
      defaultExtension: 'js'
    }
  }
});
