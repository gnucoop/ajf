/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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

import {Routes} from '@angular/router';
import {DevApp404} from './dev-app/dev-app-404';
import {DevAppHome} from './dev-app/dev-app-home';

export const DEV_APP_ROUTES: Routes = [
  {path: '', component: DevAppHome},
  {
    path: 'echarts',
    loadChildren: () => import('./echarts/echarts-demo-module').then(m => m.EchartsDemoModule),
  },
  {
    path: 'file-input',
    loadChildren: () =>
      import('./file-input/file-input-demo-module').then(m => m.FileInputDemoModule),
  },
  {
    path: 'heat-map',
    loadChildren: () => import('./heat-map/heat-map-demo-module').then(m => m.HeatMapDemoModule),
  },
  {path: 'i18n', loadChildren: () => import('./i18n/i18n-demo-module').then(m => m.I18nDemoModule)},

  {
    path: 'mat-barcode',
    loadChildren: () => import('./mat-barcode/barcode-demo-module').then(m => m.BarcodeDemoModule),
  },
  {
    path: 'mat-geolocation',
    loadChildren: () =>
      import('./mat-geolocation/geolocation-demo-module').then(m => m.GeolocationDemoModule),
  },
  {
    path: 'mat-calendar',
    loadChildren: () =>
      import('./mat-calendar/calendar-demo-module').then(m => m.CalendarDemoModule),
  },
  {
    path: 'mat-calendar-ethiopian',
    loadChildren: () =>
      import('./mat-calendar-ethiopian/calendar-ethiopian-demo-module').then(
        m => m.CalendarEthiopianDemoModule,
      ),
  },
  {
    path: 'mat-checkbox-group',
    loadChildren: () =>
      import('./mat-checkbox-group/checkbox-group-demo-module').then(
        m => m.CheckboxGroupDemoModule,
      ),
  },
  {
    path: 'mat-fields',
    loadChildren: () => import('./mat-fields/fields-demo-module').then(m => m.FieldsDemoModule),
  },
  {
    path: 'mat-form-builder',
    loadChildren: () =>
      import('./mat-form-builder/form-builder-demo-module').then(m => m.FormBuilderDemoModule),
  },
  {
    path: 'mat-automatic-report',
    loadChildren: () =>
      import('./mat-automatic-report/automatic-report-demo-module').then(
        m => m.ReportFromFormDemoModule,
      ),
  },
  {
    path: 'mat-xls-report',
    loadChildren: () =>
      import('./mat-xls-report/xls-report-demo-module').then(m => m.ReportFromXlsDemoModule),
  },
  {
    path: 'mat-forms',
    loadChildren: () => import('./mat-forms/forms-demo-module').then(m => m.FormsDemoModule),
  },
  {
    path: 'mat-image',
    loadChildren: () => import('./mat-image/image-demo-module').then(m => m.ImageDemoModule),
  },
  {
    path: 'mat-node-icon',
    loadChildren: () =>
      import('./mat-node-icon/node-icon-demo-module').then(m => m.NodeIconDemoModule),
  },
  {
    path: 'mat-page-slider',
    loadChildren: () =>
      import('./mat-page-slider/page-slider-demo-module').then(m => m.PageSliderDemoModule),
  },
  {
    path: 'mat-reports',
    loadChildren: () => import('./mat-reports/reports-demo-module').then(m => m.ReportsDemoModule),
  },
  {
    path: 'mat-signature',
    loadChildren: () =>
      import('./mat-signature/signature-demo-module').then(m => m.SignatureDemoModule),
  },
  {
    path: 'mat-time',
    loadChildren: () => import('./mat-time/time-demo-module').then(m => m.TimeDemoModule),
  },
  {
    path: 'mat-widgets',
    loadChildren: () => import('./mat-widgets/widgets-demo-module').then(m => m.WidgetsDemoModule),
  },
  {path: '**', component: DevApp404},
];
