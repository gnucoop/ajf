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

import {AjfReportWidget as CoreComponent, AjfWidgetHost, AjfWidgetType} from '@ajf/core/reports';
import {
  ChangeDetectionStrategy, ComponentFactoryResolver, Component, Renderer2, ViewChild,
  ViewEncapsulation} from '@angular/core';

import {AjfChartWidgetComponent} from './chart-widget';
import {AjfColumnWidgetComponent} from './column-widget';
import {AjfFormulaWidgetComponent} from './formula-widget';
import {AjfImageContainerWidgetComponent} from './image-container-widget';
import {AjfImageWidgetComponent} from './image-widget';
import {AjfLayoutWidgetComponent} from './layout-widget';
import {AjfMapWidgetComponent} from './map-widget';
import {AjfPageBreakWidgetComponent} from './page-break-widget';
import {AjfTableWidgetComponent} from './table-widget';
import {AjfTextWidgetComponent} from './text-widget';

@Component({
  moduleId: module.id,
  selector: 'ajf-widget',
  templateUrl: 'widget.html',
  styleUrls: ['widget.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['instance'],
  queries: {
    widgetHost: new ViewChild(AjfWidgetHost, {static: false}),
  },
})
export class AjfReportWidget extends CoreComponent {
  constructor(cfr: ComponentFactoryResolver, renderer: Renderer2) {
    super(cfr, renderer);
  }

  widgetsMap = {
    [AjfWidgetType.Layout]: {component: AjfLayoutWidgetComponent},
    [AjfWidgetType.PageBreak]: {component: AjfPageBreakWidgetComponent},
    [AjfWidgetType.Image]: {component: AjfImageWidgetComponent},
    [AjfWidgetType.Text]: {component: AjfTextWidgetComponent},
    [AjfWidgetType.Chart]: {component: AjfChartWidgetComponent},
    [AjfWidgetType.Table]: {component: AjfTableWidgetComponent},
    [AjfWidgetType.Map]: {component: AjfMapWidgetComponent},
    [AjfWidgetType.Column]: {component: AjfColumnWidgetComponent},
    [AjfWidgetType.Formula]: {component: AjfFormulaWidgetComponent},
    [AjfWidgetType.ImageContainer]: {component: AjfImageContainerWidgetComponent},
  };
}
