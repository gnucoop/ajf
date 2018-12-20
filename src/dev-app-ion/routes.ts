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

import {DevAppHome} from './dev-app';
import {CalendarDemo} from './calendar/calendar-demo';
import {CheckboxGroupDemo} from './checkbox-group/checkbox-group-demo';
import {ImageDemo} from './image/image-demo';
import {ExamplesPage} from './examples-page/examples-page';
import {NodeIconDemo} from './node-icon/node-icon-demo';

export const DEV_APP_ROUTES: Routes = [
  {path: '', component: DevAppHome},
  {path: 'calendar', component: CalendarDemo},
  {path: 'checkbox-group', component: CheckboxGroupDemo},
  {path: 'examples', component: ExamplesPage},
  {path: 'image', component: ImageDemo},
  {path: 'node-icon', component: NodeIconDemo},
];
