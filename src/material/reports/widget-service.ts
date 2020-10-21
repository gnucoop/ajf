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

import {AjfWidgetService as CoreService, AjfWidgetType as wt} from '@ajf/core/reports';
import {Injectable} from '@angular/core';

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

@Injectable({providedIn: 'root'})
export class AjfWidgetService extends CoreService {
  constructor() {
    super();
    this.componentsMap[wt.Layout] = {component: AjfLayoutWidgetComponent};
    this.componentsMap[wt.PageBreak] = {component: AjfPageBreakWidgetComponent};
    this.componentsMap[wt.Image] = {component: AjfImageWidgetComponent};
    this.componentsMap[wt.Text] = {component: AjfTextWidgetComponent};
    this.componentsMap[wt.Chart] = {component: AjfChartWidgetComponent};
    this.componentsMap[wt.Table] = {component: AjfTableWidgetComponent};
    this.componentsMap[wt.DynamicTable] = {component: AjfTableWidgetComponent};
    this.componentsMap[wt.Map] = {component: AjfMapWidgetComponent};
    this.componentsMap[wt.Column] = {component: AjfColumnWidgetComponent};
    this.componentsMap[wt.Formula] = {component: AjfFormulaWidgetComponent};
    this.componentsMap[wt.ImageContainer] = {component: AjfImageContainerWidgetComponent};
  }
}
