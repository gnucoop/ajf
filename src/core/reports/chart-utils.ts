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

import {ExtendedChartType} from '@ajf/core/chart';
import {AjfChartType} from './interface/charts/chart-type';

export function chartToChartJsType(chartType?: AjfChartType): ExtendedChartType {
    switch (chartType) {
      case AjfChartType.Line:
      return 'line';
      case AjfChartType.Bar:
      return 'bar';
      case AjfChartType.HorizontalBar:
      return 'horizontalBar';
      case AjfChartType.Radar:
      return 'radar';
      case AjfChartType.Scatter:
      return 'scatter';
      case AjfChartType.Doughnut:
      return 'doughnut';
      case AjfChartType.Pie:
      return 'pie';
      case AjfChartType.PolarArea:
      return 'polarArea';
      case AjfChartType.Bubble:
      return 'bubble';
      default:
      return 'line';
    }
  }
