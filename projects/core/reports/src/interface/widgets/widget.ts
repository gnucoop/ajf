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

import {AjfBaseWidget} from './base-widget';
import {AjfChartWidget} from './chart-widget';
import {AjfColumnWidget} from './column-widget';
import {AjfDataWidget} from './data-widget';
import {AjfDialogWidget} from './dialog-widget';
import {AjfDynamicTableWidget} from './dynamic-table-widget';
import {AjfFormulaWidget} from './formula-widget';
import {AjfImageContainerWidget} from './image-container-widget';
import {AjfImageWidget} from './image-widget';
import {AjfLayoutWidget} from './layout-widget';
import {AjfPageBreakWidget} from './page-break-widget';
import {AjfPaginatedListWidget} from './paginated-list-widget';
import {AjfMapWidget} from './map-widget';
import {AjfTextWidget} from './text-widget';
import {AjfWidgetWithContent} from './widget-with-content';
import {AjfWidgetType} from './widget-type';
import {AjfGraphWidget} from './graph-widget';

export interface AjfUnknownWidget extends AjfBaseWidget {
  widgetType: AjfWidgetType.LENGTH;
}

export type AjfWidget =
  | AjfChartWidget
  | AjfColumnWidget
  | AjfDataWidget
  | AjfDialogWidget
  | AjfDynamicTableWidget
  | AjfFormulaWidget
  | AjfGraphWidget
  | AjfImageContainerWidget
  | AjfImageWidget
  | AjfLayoutWidget
  | AjfMapWidget
  | AjfPageBreakWidget
  | AjfPaginatedListWidget
  | AjfTextWidget
  | AjfUnknownWidget
  | AjfWidgetWithContent;
