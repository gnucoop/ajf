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

import {deepCopy} from '@ajf/core/utils';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import {Chart, ChartData, ChartOptions, ChartType} from 'chart.js';

// We only need to set canvasDataUrl of the AjfChartWidgetInstance here,
// avoid importing the actual interface because of the circular dependency:
interface ChartWidgetInstance {
  canvasDataUrl?(): string;
}

@Component({
  selector: 'ajf-chart',
  templateUrl: 'chart.html',
  styleUrls: ['chart.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfChartComponent implements AfterViewInit, OnChanges {
  @Input() data?: ChartData;
  @Input() options?: ChartOptions;
  @Input() chartType?: ChartType;
  @Input() instance?: ChartWidgetInstance;
  /**
   * When specified, this number of different single data entries will be displayed as separate
   * options/bars/slices in the chart. The rest will be displayed as an aggregate "other" option/bar/slice.
   */
  @Input() mainDataNumberThreshold?: number;

  private _chart: Chart | null = null;
  private _chartCanvasElement: HTMLCanvasElement | null = null;

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
    if ('instance' in changes && this.instance != null) {
      this.instance.canvasDataUrl = () => {
        if (this._chartCanvasElement == null) {
          return '';
        }
        return this._chartCanvasElement.toDataURL();
      };
    }
  }

  private _fixData(data: ChartData): ChartData {
    const newData: ChartData = deepCopy(data);
    let maxPointsNum = 0;
    (newData.datasets || []).forEach(dataset => {
      if (dataset.label == null) {
        dataset.label = '';
      }
      maxPointsNum = Math.max(maxPointsNum, (dataset.data || []).length);
    });
    const labels = newData.labels || [];
    if (maxPointsNum > 0 && labels.length < maxPointsNum) {
      for (let i = labels.length; i < maxPointsNum; i++) {
        labels.push('');
      }
      newData.labels = labels;
    }
    if (
      newData.datasets &&
      this.chartType &&
      ['bar', 'horizontalBar', 'doughnut', 'pie'].includes(this.chartType)
    ) {
      return this._rebuildDatasets(newData);
    }
    return newData;
  }

  /**
   * Rebuilds datasets by aggregating options and omitting the unselected ones.
   * @param data The original chartData with datasets
   * @returns The chartData with rebuilt datasets
   */
  private _rebuildDatasets(data: ChartData): ChartData {
    const datasets = data.datasets;
    if (!datasets || !datasets.length) return data;
    if (datasets.length === 1 && datasets[0].data && datasets[0].data.length > 1) {
      // pie, doughnut
      let rebuiltDatasets = datasets[0].data.map((value, idx) => {
        const label = data.labels && data.labels[idx] ? (data.labels[idx] as string) : '';
        return {value: value as number, label};
      });

      if (this.mainDataNumberThreshold && this.mainDataNumberThreshold > 0) {
        const sortedDatasets = [...rebuiltDatasets].sort((a, b) => {
          if (a.value != null && b.value != null) {
            return +b.value - +a.value;
          }
          return 0;
        });
        const datasetsOverThreshold = sortedDatasets.splice(0, this.mainDataNumberThreshold);
        const otherDataset = {...sortedDatasets[0]};
        if (sortedDatasets.length && otherDataset.value) {
          const otherDatasetsTotal = sortedDatasets
            .map(sd => sd.value)
            .reduce((total, num) => {
              if (total != null && num != null) {
                return +total + +num;
              }
              return 0;
            });
          otherDataset.value = otherDatasetsTotal;
          otherDataset.label = 'Other';
          rebuiltDatasets = [...datasetsOverThreshold, otherDataset];
        } else {
          rebuiltDatasets = [...datasetsOverThreshold];
        }
      }
      rebuiltDatasets = rebuiltDatasets.filter(ds => ds.value);
      const newDataset = [{...datasets[0], data: rebuiltDatasets.map(d => d.value)}];
      return {...data, labels: rebuiltDatasets.map(d => d.label), datasets: newDataset};
    } else {
      // bar, horizontalBar
      let rebuiltDatasets = [...datasets];
      if (this.mainDataNumberThreshold && this.mainDataNumberThreshold > 0) {
        const sortedDatasets = [...rebuiltDatasets].sort((a, b) => {
          if (a.data && b.data && a.data[0] != null && b.data[0] != null) {
            return +b.data[0] - +a.data[0];
          }
          return 0;
        });
        const datasetsOverThreshold = sortedDatasets.splice(0, this.mainDataNumberThreshold);
        const otherDataset = {...sortedDatasets[0]};
        if (sortedDatasets.length && otherDataset.data) {
          const otherDatasetsTotal = sortedDatasets
            .map(sd => sd.data && sd.data[0])
            .reduce((total, num) => {
              if (total != null && num != null) {
                return +total + +num;
              }
              return 0;
            });
          otherDataset.data[0] = otherDatasetsTotal;
          otherDataset.label = 'Other';
          rebuiltDatasets = [...datasetsOverThreshold, otherDataset];
        } else {
          rebuiltDatasets = [...datasetsOverThreshold];
        }
      }
      return {...data, datasets: rebuiltDatasets.filter(ds => ds.data && ds.data[0])};
    }
  }

  private _updateChart(): void {
    if (this._chart == null) {
      this._rebuildChart();
    } else {
      (<any>this._chart).options = {
        ...deepCopy((<any>this._chart).options),
        ...deepCopy(this.options || {}),
      };
      this._chart.data = {
        ...deepCopy(this._chart.data),
        ...deepCopy(this.data),
      };
      this._chart.update();
    }
  }

  private _rebuildChart(): void {
    if (this._chart != null) {
      this._chart.destroy();
      this._chart = null;
    }
    if (this._chartCanvasElement != null) {
      this._chartCanvasElement.remove();
      this._chartCanvasElement = null;
    }
    if (this.data != null) {
      this._chartCanvasElement = this._renderer.createElement('canvas');
      const widgetExportElement: HTMLElement = this._el.nativeElement.parentElement.parentElement;
      const height = widgetExportElement.clientHeight;
      const width = widgetExportElement.clientWidth;
      if (widgetExportElement != null) {
        if (height > 0) {
          this._renderer.setStyle(this._el.nativeElement, 'height', `${height}px`);
          this._renderer.setStyle(this._chartCanvasElement, 'height', `${height}px`);
        }
        if (width > 0) {
          this._renderer.setStyle(this._chartCanvasElement, 'width', width);
        }
      } else {
        this._renderer.setStyle(this._chartCanvasElement, 'width', 'inherit');
        this._renderer.setStyle(this._chartCanvasElement, 'height', 'inherit');
      }
      this._renderer.appendChild(this._el.nativeElement, this._chartCanvasElement);
      if (this.chartType != null) {
        const ctx = this._chartCanvasElement!.getContext('2d') as CanvasRenderingContext2D;
        this._chart = new Chart(ctx, {
          type: this.chartType,
          data: this._fixData(this.data),
          options: this.options,
        });
      }
    }
  }
}
