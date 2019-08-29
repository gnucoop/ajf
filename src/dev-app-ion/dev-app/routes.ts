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

import {Routes} from '@angular/router';
import {DevApp404} from './dev-app-404';
import {DevAppHome} from './dev-app-home';

export const DEV_APP_ROUTES: Routes = [
  {path: '', component: DevAppHome},
  {path: 'barcode', loadChildren: 'barcode/barcode-demo-module#BarcodeDemoModule'},
  {path: 'calendar', loadChildren: 'calendar/calendar-demo-module#CalendarDemoModule'},
  {path: 'checkbox-group',
    loadChildren: 'checkbox-group/checkbox-group-demo-module#CheckboxGroupDemoModule'},
  {path: 'fields', loadChildren: 'fields/fields-demo-module#FieldsDemoModule'},
  {path: 'forms', loadChildren: 'forms/forms-demo-module#FormsDemoModule'},
  {path: 'image', loadChildren: 'image/image-demo-module#ImageDemoModule'},
  {path: 'node-icon', loadChildren: 'node-icon/node-icon-demo-module#NodeIconDemoModule'},
  {path: 'page-slider', loadChildren: 'page-slider/page-slider-demo-module#PageSliderDemoModule'},
  {path: 'reports', loadChildren: 'reports/reports-demo-module#ReportsDemoModule'},
  {path: 'widgets', loadChildren: 'widgets/widgets-demo-module#WidgetsDemoModule'},
  {path: 'examples', loadChildren: 'examples-page/examples-page-module#ExamplesPageModule'},
  {path: '**', component: DevApp404},
];
