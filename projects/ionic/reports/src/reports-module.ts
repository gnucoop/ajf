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
import {AjfHeatMapModule} from '@ajf/core/heat-map';
import {AjfMapModule} from '@ajf/core/map';
import {AjfPageBreakModule} from '@ajf/core/page-break';
import {AjfReportsModule as CoreModule} from '@ajf/core/reports';
import {AjfTableModule} from '@ajf/core/table';
import {AjfTextModule} from '@ajf/core/text';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {AjfImageModule} from '@ajf/ionic/image';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AjfChartWidgetComponent} from './chart-widget';
import {AjfFormulaWidgetComponent} from './formula-widget';
import {AjfHeatMapWidgetComponent} from './heat-map-widget';
import {AjfImageContainerWidgetComponent} from './image-container-widget';
import {AjfImageWidgetComponent} from './image-widget';
import {AjfMapWidgetComponent} from './map-widget';
import {AjfPageBreakWidgetComponent} from './page-break-widget';
import {AjfReportRenderer} from './report';
import {AjfTableWidgetComponent} from './table-widget';
import {AjfTextWidgetComponent} from './text-widget';
import {
  AjfColumnWidgetComponent,
  AjfDialogModal,
  AjfDialogWidgetComponent,
  AjfLayoutWidgetComponent,
  AjfPaginatedListWidgetComponent,
  AjfReportWidget,
} from './widget';

@NgModule({
  imports: [
    AjfChartModule,
    AjfCommonModule,
    AjfHeatMapModule,
    AjfImageModule,
    AjfMapModule,
    AjfPageBreakModule,
    AjfTableModule,
    AjfTextModule,
    AjfTranslocoModule,
    CommonModule,
    CoreModule,
  ],
  declarations: [
    AjfChartWidgetComponent,
    AjfColumnWidgetComponent,
    AjfDialogModal,
    AjfDialogWidgetComponent,
    AjfFormulaWidgetComponent,
    AjfHeatMapWidgetComponent,
    AjfImageContainerWidgetComponent,
    AjfImageWidgetComponent,
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
