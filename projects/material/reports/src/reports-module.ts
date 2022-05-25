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

import {AjfChartModule} from '@ajf/core/chart';
import {AjfCommonModule} from '@ajf/core/common';
import {AjfGraphModule} from '@ajf/core/graph';
import {AjfMapModule} from '@ajf/core/map';
import {AjfPageBreakModule} from '@ajf/core/page-break';
import {AjfReportsModule as CoreModule} from '@ajf/core/reports';
import {AjfTableModule} from '@ajf/core/table';
import {AjfTextModule} from '@ajf/core/text';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {AjfFormsModule} from '@ajf/material/forms';
import {AjfImageModule} from '@ajf/material/image';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

import {AjfChartWidgetComponent} from './chart-widget';
import {AjfDialogWidgetComponent} from './dialog-widget';
import {AjfFilterWidgetComponent} from './filter-widget';
import {AjfFormulaWidgetComponent} from './formula-widget';
import {AjfImageContainerWidgetComponent} from './image-container-widget';
import {AjfImageWidgetComponent} from './image-widget';
import {AjfMapWidgetComponent} from './map-widget';
import {AjfPageBreakWidgetComponent} from './page-break-widget';
import {AjfPaginatedListWidgetComponent} from './paginated-list-widget';
import {AjfReportRenderer} from './report';
import {AjfTableWidgetComponent} from './table-widget';
import {AjfTextWidgetComponent} from './text-widget';
import {AjfColumnWidgetComponent, AjfLayoutWidgetComponent, AjfReportWidget} from './widget';
import {AjfGraphWidgetComponent} from './graph-widget';

@NgModule({
  imports: [
    AjfChartModule,
    AjfCommonModule,
    AjfImageModule,
    AjfFormsModule,
    AjfGraphModule,
    AjfMapModule,
    AjfPageBreakModule,
    AjfTableModule,
    AjfTextModule,
    AjfTranslocoModule,
    CommonModule,
    CoreModule,
    MatDialogModule,
  ],
  declarations: [
    AjfChartWidgetComponent,
    AjfColumnWidgetComponent,
    AjfDialogWidgetComponent,
    AjfFilterWidgetComponent,
    AjfFormulaWidgetComponent,
    AjfImageContainerWidgetComponent,
    AjfImageWidgetComponent,
    AjfGraphWidgetComponent,
    AjfLayoutWidgetComponent,
    AjfMapWidgetComponent,
    AjfPageBreakWidgetComponent,
    AjfPaginatedListWidgetComponent,
    AjfReportRenderer,
    AjfReportWidget,
    AjfTableWidgetComponent,
    AjfTextWidgetComponent,
  ],
  exports: [AjfReportRenderer, AjfReportWidget],
})
export class AjfReportsModule {}
