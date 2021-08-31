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

import {AjfFormsModule as AjfCoreFormsModule} from '@ajf/core/forms';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {AjfFormsModule} from '@ajf/material/forms';
import {AjfReportsModule} from '@ajf/material/reports';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';

import {ReportFromFormDemo} from './report-from-form-demo';

@NgModule({
  imports: [
    AjfReportsModule,
    AjfCoreFormsModule,
    AjfFormsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ReportFromFormDemo}]),
    AjfTranslocoModule,
  ],
  declarations: [
    ReportFromFormDemo,
  ],
})
export class ReportFromFormDemoModule {
}
