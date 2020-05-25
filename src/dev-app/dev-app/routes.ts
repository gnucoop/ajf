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
import {DevApp404} from './dev-app-404';
import {DevAppHome} from './dev-app-home';

export const DEV_APP_ROUTES: Routes = [
  {path: '', component: DevAppHome},
  {path: 'file-input', loadChildren: 'file-input/file-input-demo-module#FileInputDemoModule'},
  {path: 'ion-barcode', loadChildren: 'ion-barcode/barcode-demo-module#BarcodeDemoModule'},
  {path: 'ion-calendar', loadChildren: 'ion-calendar/calendar-demo-module#CalendarDemoModule'},
  {
    path: 'ion-checkbox-group',
    loadChildren: 'ion-checkbox-group/checkbox-group-demo-module#CheckboxGroupDemoModule'
  },
  {path: 'ion-fields', loadChildren: 'ion-fields/fields-demo-module#FieldsDemoModule'},
  {path: 'ion-forms', loadChildren: 'ion-forms/forms-demo-module#FormsDemoModule'},
  {path: 'ion-image', loadChildren: 'ion-image/image-demo-module#ImageDemoModule'},
  {path: 'ion-node-icon', loadChildren: 'ion-node-icon/node-icon-demo-module#NodeIconDemoModule'},
  {
    path: 'ion-page-slider',
    loadChildren: 'ion-page-slider/page-slider-demo-module#PageSliderDemoModule'
  },
  {path: 'ion-reports', loadChildren: 'ion-reports/reports-demo-module#ReportsDemoModule'},
  {path: 'ion-widgets', loadChildren: 'ion-widgets/widgets-demo-module#WidgetsDemoModule'},
  {path: 'ion-examples', loadChildren: 'ion-examples-page/examples-page-module#ExamplesPageModule'},
  {path: 'mat-barcode', loadChildren: 'mat-barcode/barcode-demo-module#BarcodeDemoModule'},
  {path: 'mat-calendar', loadChildren: 'mat-calendar/calendar-demo-module#CalendarDemoModule'},
  {
    path: 'mat-calendar-ethiopian',
    loadChildren:
        'mat-calendar-ethiopian/calendar-ethiopian-demo-module#CalendarEthiopianDemoModule'
  },
  {
    path: 'mat-checkbox-group',
    loadChildren: 'mat-checkbox-group/checkbox-group-demo-module#CheckboxGroupDemoModule'
  },
  {path: 'mat-fields', loadChildren: 'mat-fields/fields-demo-module#FieldsDemoModule'},
  {
    path: 'mat-form-builder',
    loadChildren: 'mat-form-builder/form-builder-demo-module#FormBuilderDemoModule'
  },
  {path: 'mat-forms', loadChildren: 'mat-forms/forms-demo-module#FormsDemoModule'},
  {path: 'mat-image', loadChildren: 'mat-image/image-demo-module#ImageDemoModule'},
  {path: 'mat-node-icon', loadChildren: 'mat-node-icon/node-icon-demo-module#NodeIconDemoModule'},
  {
    path: 'mat-page-slider',
    loadChildren: 'mat-page-slider/page-slider-demo-module#PageSliderDemoModule'
  },
  {
    path: 'mat-report-builder',
    loadChildren: 'mat-report-builder/report-builder-demo-module#ReportBuilderDemoModule'
  },
  {path: 'mat-reports', loadChildren: 'mat-reports/reports-demo-module#ReportsDemoModule'},
  {path: 'mat-time', loadChildren: 'mat-time/time-demo-module#TimeDemoModule'},
  {path: 'mat-widgets', loadChildren: 'mat-widgets/widgets-demo-module#WidgetsDemoModule'},
  {path: 'examples', loadChildren: 'examples-page/examples-page-module#ExamplesPageModule'},
  {path: '**', component: DevApp404},
];
