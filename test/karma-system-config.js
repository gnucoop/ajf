// Configure the base path and map the different node packages.
System.config({
  baseURL: '/base',
  paths: {
    'node:*': 'node_modules/*',
  },
  map: {
    '@zxing/library': 'node:@zxing/library/umd/index.min.js',
    'chart.js': 'node:chart.js/Chart.umd.js',
    'chart.piecelabel.js': 'node:chart.piecelabel.js/build/Chart.PieceLabel.min.js',
    'css-element-queries': 'node:css-element-queries/css-element-queries.umd.js',
    'date-fns': 'node:date-fns/date-fns.umd.js',
    'debug': 'node:debug/debug.umd.js',
    'esprima': 'node:esprima/esprima.umd.js',
    'leaflet': 'node:leaflet/leaflet.umd.js',
    'moment': 'node:moment/min/moment.min.js',
    'numeral': 'node:numeral/numeral.umd.js',
    'rxjs': 'node:rxjs',
    'tslib': 'node:tslib/tslib.js',

    // Angular specific mappings.
    '@angular/core': 'node:@angular/core/bundles/core.umd.js',
    '@angular/core/testing': 'node:@angular/core/bundles/core-testing.umd.min.js',
    '@angular/common': 'node:@angular/common/bundles/common.umd.min.js',
    '@angular/common/testing': 'node:@angular/common/bundles/common-testing.umd.min.js',
    '@angular/common/http': 'node:@angular/common/bundles/common-http.umd.min.js',
    '@angular/common/http/testing': 'node:@angular/common/bundles/common-http-testing.umd.min.js',
    '@angular/compiler': 'node:@angular/compiler/bundles/compiler.umd.min.js',
    '@angular/compiler/testing': 'node:@angular/compiler/bundles/compiler-testing.umd.min.js',
    '@angular/forms': 'node:@angular/forms/bundles/forms.umd.min.js',
    '@angular/forms/testing': 'node:@angular/forms/bundles/forms-testing.umd.min.js',
    '@angular/animations': 'node:@angular/animations/bundles/animations.umd.min.js',
    '@angular/animations/browser': 'node:@angular/animations/bundles/animations-browser.umd.min.js',
    '@angular/platform-browser/animations':
      'node:@angular/platform-browser/bundles/platform-browser-animations.umd.min.js',
    '@angular/platform-browser':
      'node:@angular/platform-browser/bundles/platform-browser.umd.min.js',
    '@angular/platform-browser/testing':
      'node:@angular/platform-browser/bundles/platform-browser-testing.umd.min.js',
    '@angular/platform-browser-dynamic':
      'node:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
    '@angular/platform-browser-dynamic/testing':
      'node:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.min.js',
    '@angular/router': 'node:@angular/router/bundles/router.umd.min.js',

    '@angular/cdk': 'node:@angular/cdk/bundles/cdk.umd.js',

    '@angular/cdk/a11y': 'node:@angular/cdk/bundles/cdk-a11y.umd.min.js',
    '@angular/cdk/bidi': 'node:@angular/cdk/bundles/cdk-bidi.umd.min.js',
    '@angular/cdk/coercion': 'node:@angular/cdk/bundles/cdk-coercion.umd.min.js',
    '@angular/cdk/collections': 'node:@angular/cdk/bundles/cdk-collections.umd.min.js',
    '@angular/cdk/keycodes': 'node:@angular/cdk/bundles/cdk-keycodes.umd.min.js',
    '@angular/cdk/observers': 'node:@angular/cdk/bundles/cdk-observers.umd.min.js',
    '@angular/cdk/overlay': 'node:@angular/cdk/bundles/cdk-overlay.umd.min.js',
    '@angular/cdk/portal': 'node:@angular/cdk/bundles/cdk-portal.umd.min.js',
    '@angular/cdk/platform': 'node:@angular/cdk/bundles/cdk-platform.umd.min.js',
    '@angular/cdk/scrolling': 'node:@angular/cdk/bundles/cdk-scrolling.umd.min.js',
    '@angular/cdk/text-field': 'node:@angular/cdk/bundles/cdk-text-field.umd.min.js',
    '@angular/material/button': 'node:@angular/material/bundles/material-button.umd.js',
    '@angular/material/button-toggle': 'node:@angular/material/bundles/material-button-toggle.umd.js',
    '@angular/material/core': 'node:@angular/material/bundles/material-core.umd.min.js',
    '@angular/material/dialog': 'node:@angular/material/bundles/material-dialog.umd.min.js',
    '@angular/material/card': 'node:@angular/material/bundles/material-card.umd.min.js',
    '@angular/material/icon': 'node:@angular/material/bundles/material-icon.umd.min.js',
    '@angular/material/form-field': 'node:@angular/material/bundles/material-form-field.umd.min.js',
    '@angular/material/slide-toggle': 'node:@angular/material/bundles/material-slide-toggle.umd.min.js',
    '@angular/material/input': 'node:@angular/material/bundles/material-input.umd.min.js',
    '@angular/material/radio': 'node:@angular/material/bundles/material-radio.umd.min.js',
    '@angular/material/select': 'node:@angular/material/bundles/material-select.umd.min.js',
    '@angular/material/toolbar': 'node:@angular/material/bundles/material-toolbar.umd.min.js',
    
    '@ngx-translate/core': 'node:@ngx-translate/core/bundles/ngx-translate-core.umd.js',
    '@ngx-translate/http-loader':
      'node:@ngx-translate/http-loader/bundles/ngx-translate-http-loader.umd.js',
    
    '@gic/core': 'node:@gic/core/core.umd.js',
    '@gic/core/loader': 'node:@gic/core/core-loader.umd.js',
    '@gic/angular': 'node:@gic/angular/angular.umd.js',
    '@ionic/core': 'node:@ionic/core/core.umd.js',
    '@ionic/core/loader': 'node:@ionic/core/core-loader.umd.js',
    '@ionic/angular': 'node:@ionic/angular/angular.umd.js',

    '@ajf/core': 'dist/packages/core/index.js',
    '@ajf/core/calendar': 'dist/packages/core/calendar/index.js',
    '@ajf/core/barcode': 'dist/packages/core/barcode/index.js',
    '@ajf/core/checkbox-group': 'dist/packages/core/checkbox-group/index.js',
    '@ajf/core/chart': 'dist/packages/core/chart/index.js',
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
    '@ajf/core/text': 'dist/packages/core/text/index.js',
    '@ajf/core/time': 'dist/packages/core/time/index.js',
    '@ajf/core/utils': 'dist/packages/core/utils/index.js',
    '@ajf/ionic': 'dist/packages/ionic/index.js',
    '@ajf/ionic/calendar': 'dist/packages/ionic/calendar/index.js',
    '@ajf/ionic/barcode': 'dist/packages/ionic/barcode/index.js',
    '@ajf/ionic/checkbox-group': 'dist/packages/ionic/checkbox-group/index.js',
    '@ajf/ionic/forms': 'dist/packages/ionic/forms/index.js',
    '@ajf/ionic/image': 'dist/packages/ionic/image/index.js',
    '@ajf/ionic/node-icon': 'dist/packages/ionic/node-icon/index.js',
    '@ajf/ionic/page-slider': 'dist/packages/ionic/page-slider/index.js',
    '@ajf/ionic/reports': 'dist/packages/ionic/reports/index.js',
    '@ajf/material': 'dist/packages/material/index.js',
    '@ajf/material/calendar': 'dist/packages/material/calendar/index.js',
    '@ajf/material/barcode': 'dist/packages/material/barcode/index.js',
    '@ajf/material/checkbox-group': 'dist/packages/material/checkbox-group/index.js',
    '@ajf/material/form-builder': 'dist/packages/material/form-builder/index.js',
    '@ajf/material/forms': 'dist/packages/material/forms/index.js',
    '@ajf/material/image': 'dist/packages/material/image/index.js',
    '@ajf/material/monaco-editor': 'dist/packages/material/monaco-editor/index.js',
    '@ajf/material/node-icon': 'dist/packages/material/node-icon/index.js',
    '@ajf/material/page-slider': 'dist/packages/material/page-slider/index.js',
    '@ajf/material/report-builder': 'dist/packages/material/report-builder/index.js',
    '@ajf/material/reports': 'dist/packages/material/reports/index.js',
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
  }
});
