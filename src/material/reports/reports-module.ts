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
import {AjfMapModule} from '@ajf/core/map';
import {AjfPageBreakModule} from '@ajf/core/page-break';
import {
  AJF_DEFAULT_WIDGETS,
  AjfReportsModule as CoreModule,
  AjfWidgetComponentsMap,
  AjfWidgetType as wt,
} from '@ajf/core/reports';
import {AjfTableModule} from '@ajf/core/table';
import {AjfTextModule} from '@ajf/core/text';
import {AjfImageModule} from '@ajf/material/image';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

import {AjfChartWidgetComponent} from './chart-widget';
import {AjfColumnWidgetComponent} from './column-widget';
import {AjfFormulaWidgetComponent} from './formula-widget';
import {AjfImageContainerWidgetComponent} from './image-container-widget';
import {AjfImageWidgetComponent} from './image-widget';
import {AjfLayoutWidgetComponent} from './layout-widget';
import {AjfMapWidgetComponent} from './map-widget';
import {AjfPageBreakWidgetComponent} from './page-break-widget';
import {AjfReportRenderer} from './report';
import {AjfTableWidgetComponent} from './table-widget';
import {AjfTextWidgetComponent} from './text-widget';
import {AjfReportWidget} from './widget';

const defaultWidgets = {} as AjfWidgetComponentsMap;
defaultWidgets[wt.Layout] = {
  component: AjfLayoutWidgetComponent
};
defaultWidgets[wt.PageBreak] = {
  component: AjfPageBreakWidgetComponent
};
defaultWidgets[wt.Image] = {
  component: AjfImageWidgetComponent
};
defaultWidgets[wt.Text] = {
  component: AjfTextWidgetComponent
};
defaultWidgets[wt.Chart] = {
  component: AjfChartWidgetComponent
};
defaultWidgets[wt.Table] = {
  component: AjfTableWidgetComponent
};
defaultWidgets[wt.DynamicTable] = {
  component: AjfTableWidgetComponent
};
defaultWidgets[wt.Map] = {
  component: AjfMapWidgetComponent
};
defaultWidgets[wt.Column] = {
  component: AjfColumnWidgetComponent
};
defaultWidgets[wt.Formula] = {
  component: AjfFormulaWidgetComponent
};
defaultWidgets[wt.ImageContainer] = {
  component: AjfImageContainerWidgetComponent
};

@NgModule({
  imports: [
    AjfChartModule,
    AjfCommonModule,
    AjfImageModule,
    AjfMapModule,
    AjfPageBreakModule,
    AjfTableModule,
    AjfTextModule,
    CommonModule,
    CoreModule,
    TranslateModule,
  ],
  declarations: [
    AjfChartWidgetComponent,
    AjfColumnWidgetComponent,
    AjfFormulaWidgetComponent,
    AjfImageContainerWidgetComponent,
    AjfImageWidgetComponent,
    AjfLayoutWidgetComponent,
    AjfMapWidgetComponent,
    AjfPageBreakWidgetComponent,
    AjfReportRenderer,
    AjfReportWidget,
    AjfTableWidgetComponent,
    AjfTextWidgetComponent,
  ],
  exports: [
    AjfReportRenderer,
    AjfReportWidget,
  ],
  providers: [
    {provide: AJF_DEFAULT_WIDGETS, useValue: defaultWidgets},
  ],
})
export class AjfReportsModule {
}
