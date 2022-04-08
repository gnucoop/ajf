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

import {AjfUnknownWidget} from '../widgets/widget';
import {AjfBaseWidgetInstance} from './base-widget-instance';
import {AjfChartWidgetInstance} from './chart-widget-instance';
import {AjfColumnWidgetInstance} from './column-widget-instance';
import {AjfDataWidgetInstance} from './data-widget-instance';
import {AjfDynamicTableWidgetInstance} from './dynamic-table-widget-instance';
import {AjfFormulaWidgetInstance} from './formula-widget-instance';
import {AjfGraphWidgetInstance} from './graph-widget-instance';
import {AjfImageContainerWidgetInstance} from './image-container-widget-instance';
import {AjfImageWidgetInstance} from './image-widget-instance';
import {AjfLayoutWidgetInstance} from './layout-widget-instance';
import {AjfMapWidgetInstance} from './map-widget-instance';
import {AjfPageBreakWidgetInstance} from './page-break-widget-instance';
import {AjfTableWidgetInstance} from './table-widget-instance';
import {AjfTextWidgetInstance} from './text-widget-instance';
import {AjfWidgetWithContentInstance} from './widget-with-content-instance';

export interface AjfUnknownWidgetInstance extends AjfBaseWidgetInstance {
  widget: AjfUnknownWidget;
}

export type AjfWidgetInstance =
  | AjfChartWidgetInstance
  | AjfColumnWidgetInstance
  | AjfDataWidgetInstance
  | AjfDynamicTableWidgetInstance
  | AjfFormulaWidgetInstance
  | AjfGraphWidgetInstance
  | AjfImageContainerWidgetInstance
  | AjfImageWidgetInstance
  | AjfLayoutWidgetInstance
  | AjfMapWidgetInstance
  | AjfPageBreakWidgetInstance
  | AjfTableWidgetInstance
  | AjfTextWidgetInstance
  | AjfWidgetWithContentInstance;
