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
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {RouterModule} from '@angular/router';

import {AjfReportBuilderModule} from '@ajf/material/report-builder';

import {ReportBuilderDemo} from './report-builder-demo';

@NgModule({
  imports: [
    AjfReportBuilderModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    RouterModule.forChild([{path: '', component: ReportBuilderDemo}]),
  ],
  declarations: [
    ReportBuilderDemo,
  ],
})
export class ReportBuilderDemoModule {
}
