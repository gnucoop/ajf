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
    'node:*': 'node_modules/*'
  },
  map: {
    'traceur': 'node:traceur/bin/traceur.js',

    'main': 'main.js',

    'chart.js': 'node:chart.js/dist/Chart.bundle.js',
    'chart.piecelabel.js': 'node:chart.piecelabel.js/build/Chart.PieceLabel.min.js',
    'css-element-queries': 'node:css-element-queries/index.js',
    'date-fns': 'node:date-fns/index.js',
    'debug': 'node:debug/src/browser.js',
    'esprima': 'node:esprima/esprima.js',
    'leaflet': 'node:leaflet/dist/leaflet.js',
    'ms': 'node:ms/index.js',
    'ngx-color-picker': 'node:ngx-color-picker/bundles/ngx-color-picker.umd.js',
    'numeral': 'node:numeral/numeral.js',
    'quill': 'node:quill/dist/quill.js',
    'rxjs': 'node:rxjs',
    'tslib': 'node:tslib/tslib.js',
    'url-parse': 'node:url-parse/dist/url-parse.min.js',

    // Angular specific mappings.
    '@angular/core': 'node:@angular/core/bundles/core.umd.js',
    '@angular/common': 'node:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'node:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'node:@angular/compiler/bundles/compiler.umd.js',
    '@angular/forms': 'node:@angular/forms/bundles/forms.umd.js',
    '@angular/animations': 'node:@angular/animations/bundles/animations.umd.js',
    '@angular/elements': 'node:@angular/elements/bundles/elements.umd.js',
    '@angular/router': 'node:@angular/router/bundles/router.umd.js',
    '@angular/animations/browser': 'node:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations':
      'node:@angular/platform-browser/bundles/platform-browser-animations.umd',
    '@angular/platform-browser':
      'node:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic':
      'node:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

    '@angular/cdk/a11y': 'node:@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/accordion': 'node:@angular/cdk/bundles/cdk-accordion.umd.js',
    '@angular/cdk/bidi': 'node:@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': 'node:@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/collections': 'node:@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/cdk/drag-drop': 'node:@angular/cdk/bundles/cdk-drag-drop.umd.js',
    '@angular/cdk/keycodes': 'node:@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/layout': 'node:@angular/cdk/bundles/cdk-layout.umd.js',
    '@angular/cdk/observers': 'node:@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/overlay': 'node:@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/platform': 'node:@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': 'node:@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/scrolling': 'node:@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/stepper': 'node:@angular/cdk/bundles/cdk-stepper.umd.js',
    '@angular/cdk/table': 'node:@angular/cdk/bundles/cdk-table.umd.js',
    '@angular/cdk/text-field': 'node:@angular/cdk/bundles/cdk-text-field.umd.js',
    '@angular/cdk/tree': 'node:@angular/cdk/bundles/cdk-tree.umd.js',
    '@angular/material': 'node:@angular/material/bundles/material.umd.js',
    '@angular/material/button': 'node:@angular/material/bundles/material-button.umd.js',
    '@angular/material/button-toggle':
      'node:@angular/material/bundles/material-button-toggle.umd.js',
    '@angular/material/card': 'node:@angular/material/bundles/material-card.umd.js',
    '@angular/material/checkbox': 'node:@angular/material/bundles/material-checkbox.umd.js',
    '@angular/material/core': 'node:@angular/material/bundles/material-core.umd.js',
    '@angular/material/dialog': 'node:@angular/material/bundles/material-dialog.umd.js',
    '@angular/material/divider': 'node:@angular/material/bundles/material-divider.umd.js',
    '@angular/material/expansion': 'node:@angular/material/bundles/material-expansion.umd.js',
    '@angular/material/form-field': 'node:@angular/material/bundles/material-form-field.umd.js',
    '@angular/material/grid-list': 'node:@angular/material/bundles/material-grid-list.umd.js',
    '@angular/material/icon': 'node:@angular/material/bundles/material-icon.umd.js',
    '@angular/material/input': 'node:@angular/material/bundles/material-input.umd.js',
    '@angular/material/list': 'node:@angular/material/bundles/material-list.umd.js',
    '@angular/material/menu': 'node:@angular/material/bundles/material-menu.umd.js',
    '@angular/material/paginator': 'node:@angular/material/bundles/material-paginator.umd.js',
    '@angular/material/progress-bar': 'node:@angular/material/bundles/material-progress-bar.umd.js',
    '@angular/material/radio': 'node:@angular/material/bundles/material-radio.umd.js',
    '@angular/material/select': 'node:@angular/material/bundles/material-select.umd.js',
    '@angular/material/sidenav': 'node:@angular/material/bundles/material-sidenav.umd.js',
    '@angular/material/slide-toggle': 'node:@angular/material/bundles/material-slide-toggle.umd.js',
    '@angular/material/slider': 'node:@angular/material/bundles/material-slider.umd.js',
    '@angular/material/snack-bar': 'node:@angular/material/bundles/material-snack-bar.umd.js',
    '@angular/material/sort': 'node:@angular/material/bundles/material-sort.umd.js',
    '@angular/material/table': 'node:@angular/material/bundles/material-table.umd.js',
    '@angular/material/tabs': 'node:@angular/material/bundles/material-tabs.umd.js',
    '@angular/material/toolbar': 'node:@angular/material/bundles/material-toolbar.umd.js',
    '@angular/material/tooltip': 'node:@angular/material/bundles/material-tooltip.umd.js',

    '@ngx-translate/core': 'node:@ngx-translate/core/bundles/ngx-translate-core.umd.js',
    '@ngx-translate/http-loader':
      'node:@ngx-translate/http-loader/bundles/ngx-translate-http-loader.umd.js',

    '@ajf/core': 'dist/packages/core/index.js',
    '@ajf/material': 'dist/packages/material/index.js',
    '@ajf/material-examples': 'dist/packages/material-examples/index.js',

    '@ajf/core/calendar': 'dist/packages/core/calendar/index.js',
    '@ajf/core/chart': 'dist/packages/core/chart/index.js',
    '@ajf/core/checkbox-group': 'dist/packages/core/checkbox-group/index.js',
    '@ajf/core/common': 'dist/packages/core/common/index.js',
    '@ajf/core/models': 'dist/packages/core/models/index.js',
    '@ajf/core/node-icon': 'dist/packages/core/node-icon/index.js',
    '@ajf/core/forms': 'dist/packages/core/forms/index.js',
    '@ajf/core/image': 'dist/packages/core/image/index.js',
    '@ajf/core/map': 'dist/packages/core/map/index.js',
    '@ajf/core/page-break': 'dist/packages/core/page-break/index.js',
    '@ajf/core/page-slider': 'dist/packages/core/page-slider/index.js',
    '@ajf/core/reports': 'dist/packages/core/reports/index.js',
    '@ajf/core/table': 'dist/packages/core/table/index.js',
    '@ajf/core/text': 'dist/packages/core/text/index.js',
    '@ajf/core/utils': 'dist/packages/core/utils/index.js',
    '@ajf/material/calendar': 'dist/packages/material/calendar/index.js',
    '@ajf/material/checkbox-group': 'dist/packages/material/checkbox-group/index.js',
    '@ajf/material/form-builder': 'dist/packages/material/form-builder/index.js',
    '@ajf/material/forms': 'dist/packages/material/forms/index.js',
    '@ajf/material/image': 'dist/packages/material/image/index.js',
    '@ajf/material/monaco-editor': 'dist/packages/material/monaco-editor/index.js',
    '@ajf/material/node-icon': 'dist/packages/material/node-icon/index.js',
    '@ajf/material/page-slider': 'dist/packages/material/page-slider/index.js',
    '@ajf/material/report-builder': 'dist/packages/material/report-builder/index.js',
    '@ajf/material/reports': 'dist/packages/material/reports/index.js',
    '@ajf/material/time': 'dist/packages/material/time/index.js',
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': {main: 'index'},
    'rxjs/operators': {main: 'index'},

    // Set the default extension for the root package, because otherwise the dev-app-mat can't
    // be built within the production mode. Due to missing file extensions.
    '.': {
      defaultExtension: 'js'
    }
  },
});
