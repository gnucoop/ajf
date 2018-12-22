// Configure the base path and map the different node packages.
System.config({
  baseURL: '/base',
  paths: {
    'node:*': 'node_modules/*'
  },
  map: {
    'traceur': 'node:traceur/bin/traceur.js',

    'date-fns': 'node:date-fns/index.js',
    'debug': 'node:debug/src/browser.js',
    'esprima': 'node:esprima/esprima.js',
    'ms': 'node:ms/index.js',
    'numeral': 'node:numeral/numeral.js',
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

    '@angular/cdk/a11y': 'node:@angular/cdk/bundles/cdk-a11y.umd.min.js',
    '@angular/cdk/bidi': 'node:@angular/cdk/bundles/cdk-bidi.umd.min.js',
    '@angular/cdk/coercion': 'node:@angular/cdk/bundles/cdk-coercion.umd.min.js',
    '@angular/cdk/keycodes': 'node:@angular/cdk/bundles/cdk-keycodes.umd.min.js',
    '@angular/cdk/observers': 'node:@angular/cdk/bundles/cdk-observers.umd.min.js',
    '@angular/cdk/platform': 'node:@angular/cdk/bundles/cdk-platform.umd.min.js',
    '@angular/material/core': 'node:@angular/material/bundles/material-core.umd.min.js',
    '@angular/material/card': 'node:@angular/material/bundles/material-card.umd.min.js',
    '@angular/material/icon': 'node:@angular/material/bundles/material-icon.umd.min.js',
    '@angular/material/toolbar': 'node:@angular/material/bundles/material-toolbar.umd.min.js',
    
    '@ngx-translate/core': 'node:@ngx-translate/core/bundles/ngx-translate-core.umd.js',
    '@ngx-translate/http-loader':
      'node:@ngx-translate/http-loader/bundles/ngx-translate-http-loader.umd.js',
    
    '@ionic/angular': 'bundles:ionic-angular.umd.js',
    '@ionic-native/core': 'node:@ionic-native/core',
    '@ionic-native/keyboard/ngx': 'node:@ionic-native/keyboard/ngx/index.js',
    'ionic-selectable': 'node:ionic-selectable/bundles/ionic-selectable.umd.js',
    'ionicons': 'node:ionicons',

    '@ajf/core': 'dist/packages/core/index.js',
    '@ajf/core/calendar': 'dist/packages/core/calendar/index.js',
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
    '@ajf/core/text': 'dist/packages/core/text/index.js',
    '@ajf/core/utils': 'dist/packages/core/utils/index.js',
    '@ajf/ionic': 'dist/packages/ionic/index.js',
    '@ajf/ionic/calendar': 'dist/packages/ionic/calendar/index.js',
    '@ajf/ionic/checkbox-group': 'dist/packages/ionic/checkbox-group/index.js',
    '@ajf/ionic/forms': 'dist/packages/ionic/forms/index.js',
    '@ajf/ionic/image': 'dist/packages/ionic/image/index.js',
    '@ajf/ionic/node-icon': 'dist/packages/ionic/node-icon/index.js',
    '@ajf/ionic/page-slider': 'dist/packages/ionic/page-slider/index.js',
    '@ajf/ionic/reports': 'dist/packages/ionic/reports/index.js',
    '@ajf/material': 'dist/packages/material/index.js',
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
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': {main: 'index'},
    'rxjs/operators': {main: 'index'},
    '@ionic-native/core': {main: 'index'},

    // Set the default extension for the root package, because otherwise the dev-app-mat can't
    // be built within the production mode. Due to missing file extensions.
    '.': {
      defaultExtension: 'js'
    }
  }
});
