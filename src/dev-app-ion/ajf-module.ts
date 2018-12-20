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

import {NgModule} from '@angular/core';

import {AjfCalendarModule} from '@ajf/ionic/calendar';
import {AjfCheckboxGroupModule} from '@ajf/ionic/checkbox-group';
import {AjfFormsModule} from '@ajf/ionic/forms';
import {AjfImageModule} from '@ajf/ionic/image';
import {AjfNodeIconModule} from '@ajf/ionic/node-icon';
import {AjfPageSliderModule} from '@ajf/ionic/page-slider';
import {AjfReportsModule} from '@ajf/ionic/reports';

/**
 * NgModule that includes all Ajf modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    AjfCalendarModule,
    AjfCheckboxGroupModule,
    AjfFormsModule,
    AjfImageModule,
    AjfNodeIconModule,
    AjfPageSliderModule,
    AjfReportsModule,
  ]
})
export class DevAppAjfModule {}
