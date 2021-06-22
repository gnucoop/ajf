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

import {AjfWidgetComponentsMap, AjfWidgetType as wt} from '@ajf/core/reports';
import {InjectionToken} from '@angular/core';

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

const factory = (): AjfWidgetComponentsMap => {
  const defaultWidgets = {} as AjfWidgetComponentsMap;
  defaultWidgets[wt.Layout] = {component: AjfLayoutWidgetComponent};
  defaultWidgets[wt.PageBreak] = {component: AjfPageBreakWidgetComponent};
  defaultWidgets[wt.Image] = {component: AjfImageWidgetComponent};
  defaultWidgets[wt.Text] = {component: AjfTextWidgetComponent};
  defaultWidgets[wt.Chart] = {component: AjfChartWidgetComponent};
  defaultWidgets[wt.Table] = {component: AjfTableWidgetComponent};
  defaultWidgets[wt.DynamicTable] = {component: AjfTableWidgetComponent};
  defaultWidgets[wt.Map] = {component: AjfMapWidgetComponent};
  defaultWidgets[wt.Column] = {component: AjfColumnWidgetComponent};
  defaultWidgets[wt.Formula] = {component: AjfFormulaWidgetComponent};
  defaultWidgets[wt.ImageContainer] = {component: AjfImageContainerWidgetComponent};
  return defaultWidgets;
};

export const AJF_DEFAULT_WIDGETS = new InjectionToken<AjfWidgetComponentsMap>(
    'ajf-mat-default-widgets', {providedIn: 'root', factory});
