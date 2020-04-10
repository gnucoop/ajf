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

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import * as Chart from 'chart.js';
const chartClass = (<any>Chart).default || Chart;
// tslint:disable-next-line
import {ChartData, ChartOptions, ChartPoint} from 'chart.js';
import 'chart.piecelabel.js';

import {deepCopy} from '@ajf/core/utils';
import {ExtendedChartType} from './extended-chart-type';


@Component({
  selector: 'ajf-chart',
  templateUrl: 'chart.html',
  styleUrls: ['chart.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AjfChartComponent implements AfterViewInit, OnChanges {
  @Input() data: ChartData;
  @Input() options: ChartOptions;
  @Input() chartType: ExtendedChartType;

  private _chart: Chart|null;
  private _chartCanvasElement: any;
  private _chartTypesNeedPoints: ExtendedChartType[] = ['scatter', 'bubble'];

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this._rebuildChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('chartType' in changes) {
      this._rebuildChart();
    } else if ('options' in changes || 'data' in changes) {
      this._updateChart();
    }
  }

  private _fixData(chartType: ExtendedChartType, data: ChartData): ChartData {
    const newData: ChartData = deepCopy(data);
    let maxPointsNum = 0;
    (newData.datasets || []).forEach((dataset) => {
      if (dataset.label == null) {
        dataset.label = '';
      }
      maxPointsNum = Math.max(maxPointsNum, (dataset.data || []).length);
      const datasetType = dataset.type != null ? <ExtendedChartType>dataset.type : chartType;
      if (this._chartTypesNeedPoints.indexOf(datasetType) > -1) {
        dataset.data = (<any[]>(dataset.data || [])).map((d, idx) => {
          if (typeof d === 'number') {
            return <any>{x: idx, y: d, r: d};
          }
          return <ChartPoint>d;
        });
      }
    });
    const labels = newData.labels || [];
    if (maxPointsNum > 0 && labels.length < maxPointsNum) {
      for (let i = labels.length; i < maxPointsNum; i++) {
        labels.push('');
      }
      newData.labels = labels;
    }
    return newData;
  }

  private _updateChart(): void {
    if (this._chart == null) {
      this._rebuildChart();
    } else {
      (<any>this._chart).options = {
        ...deepCopy((<any>this._chart).options),
        ...deepCopy(this.options || {})
      };
      this._chart.data = {...deepCopy(this._chart.data), ...deepCopy(this.data)};
      this._chart.update();
    }
  }

  private _rebuildChart(): void {
    if (this._chart != null) {
      this._chart.destroy();
      this._chart = null;
    }
    if (this._chartCanvasElement != null) {
      this._renderer.removeChild(this._el.nativeElement, this._chartCanvasElement);
      this._chartCanvasElement = null;
    }
    if (this.data != null) {
      this._chartCanvasElement = this._renderer.createElement('canvas');
      this._renderer.setStyle(this._chartCanvasElement, 'width', 'inherit');
      this._renderer.setStyle(this._chartCanvasElement, 'height', 'inherit');
      this._renderer.appendChild(this._el.nativeElement, this._chartCanvasElement);
      const ctx = this._chartCanvasElement.getContext('2d');
      this._chart = new chartClass(ctx, {
        type: this.chartType,
        data: this._fixData(this.chartType, this.data),
        options: this._fixChartOptions(this.options)
      });
    }
  }

  private _fixChartOptions(options: ChartOptions): ChartOptions {
    options = options || {};
    if (options.scales == null) {
      options.scales = {xAxes: [], yAxes: []};
    }
    if (options.scales.xAxes == null) {
      options.scales.xAxes = [];
    }
    if (options.scales.yAxes == null) {
      options.scales.yAxes = [];
    }
    if (this.chartType == 'pie') {
      let newOptions = <any>options;
      newOptions.pieceLabel = {
        render: function(args: any) {
          if (args.label) {
            return args.label + ':' + args.value;
          } else {
            return args.value;
          }
        },
        position: 'outside'
      };
      return newOptions;
    }
    return options;
  }
}
