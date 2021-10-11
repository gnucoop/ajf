/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Routes} from '@angular/router';
import {DevApp404} from './dev-app/dev-app-404';
import {DevAppHome} from './dev-app/dev-app-home';

export const DEV_APP_ROUTES: Routes = [
  {path: '', component: DevAppHome},
  {
    path: 'file-input',
    loadChildren: () =>
        import('./file-input/file-input-demo-module').then(m => m.FileInputDemoModule)
  },
  {
    path: 'ion-barcode',
    loadChildren: () => import('./ion-barcode/barcode-demo-module').then(m => m.BarcodeDemoModule)
  },
  {
    path: 'ion-calendar',
    loadChildren: () =>
        import('./ion-calendar/calendar-demo-module').then(m => m.CalendarDemoModule)
  },
  {path: 'i18n', loadChildren: () => import('./i18n/i18n-demo-module').then(m => m.I18nDemoModule)},
  {
    path: 'ion-checkbox-group',
    loadChildren: () => import('./ion-checkbox-group/checkbox-group-demo-module')
                            .then(m => m.CheckboxGroupDemoModule)
  },
  {
    path: 'ion-fields',
    loadChildren: () => import('./ion-fields/fields-demo-module').then(m => m.FieldsDemoModule)
  },
  {
    path: 'ion-forms',
    loadChildren: () => import('./ion-forms/forms-demo-module').then(m => m.FormsDemoModule)
  },
  {
    path: 'ion-image',
    loadChildren: () => import('./ion-image/image-demo-module').then(m => m.ImageDemoModule)
  },
  {
    path: 'ion-node-icon',
    loadChildren: () =>
        import('./ion-node-icon/node-icon-demo-module').then(m => m.NodeIconDemoModule)
  },
  {
    path: 'ion-page-slider',
    loadChildren: () =>
        import('./ion-page-slider/page-slider-demo-module').then(m => m.PageSliderDemoModule)
  },
  {
    path: 'ion-reports',
    loadChildren: () => import('./ion-reports/reports-demo-module').then(m => m.ReportsDemoModule)
  },
  {
    path: 'ion-widgets',
    loadChildren: () => import('./ion-widgets/widgets-demo-module').then(m => m.WidgetsDemoModule)
  },
  {
    path: 'mat-barcode',
    loadChildren: () => import('./mat-barcode/barcode-demo-module').then(m => m.BarcodeDemoModule)
  },
  {
    path: 'mat-calendar',
    loadChildren: () =>
        import('./mat-calendar/calendar-demo-module').then(m => m.CalendarDemoModule)
  },
  {
    path: 'mat-calendar-ethiopian',
    loadChildren: () => import('./mat-calendar-ethiopian/calendar-ethiopian-demo-module')
                            .then(m => m.CalendarEthiopianDemoModule)
  },
  {
    path: 'mat-checkbox-group',
    loadChildren: () => import('./mat-checkbox-group/checkbox-group-demo-module')
                            .then(m => m.CheckboxGroupDemoModule)
  },
  {
    path: 'mat-fields',
    loadChildren: () => import('./mat-fields/fields-demo-module').then(m => m.FieldsDemoModule)
  },
  {
    path: 'mat-form-builder',
    loadChildren: () =>
        import('./mat-form-builder/form-builder-demo-module').then(m => m.FormBuilderDemoModule)
  },
  {
    path: 'mat-report-from-form',
    loadChildren: () => import('./mat-report-from-form/report-from-form-demo-module')
                            .then(m => m.ReportFromFormDemoModule)
  },
  {
    path: 'mat-forms',
    loadChildren: () => import('./mat-forms/forms-demo-module').then(m => m.FormsDemoModule)
  },
  {
    path: 'mat-image',
    loadChildren: () => import('./mat-image/image-demo-module').then(m => m.ImageDemoModule)
  },
  {
    path: 'mat-node-icon',
    loadChildren: () =>
        import('./mat-node-icon/node-icon-demo-module').then(m => m.NodeIconDemoModule)
  },
  {
    path: 'mat-page-slider',
    loadChildren: () =>
        import('./mat-page-slider/page-slider-demo-module').then(m => m.PageSliderDemoModule)
  },
  {
    path: 'mat-report-builder',
    loadChildren: () => import('./mat-report-builder/report-builder-demo-module')
                            .then(m => m.ReportBuilderDemoModule)
  },
  {
    path: 'mat-reports',
    loadChildren: () => import('./mat-reports/reports-demo-module').then(m => m.ReportsDemoModule)
  },
  {
    path: 'mat-time',
    loadChildren: () => import('./mat-time/time-demo-module').then(m => m.TimeDemoModule)
  },
  {
    path: 'mat-widgets',
    loadChildren: () => import('./mat-widgets/widgets-demo-module').then(m => m.WidgetsDemoModule)
  },
  {
    path: 'examples',
    loadChildren: () =>
        import('./examples-page/examples-page-module').then(m => m.ExamplesPageModule)
  },
  {path: '**', component: DevApp404},
];
