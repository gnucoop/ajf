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
  ViewEncapsulation
} from '@angular/core';
import {
  Chart,
  ChartData,
  ChartLegendLabelItem,
  ChartOptions,
  ChartPoint,
  ChartSize,
  ChartTooltipItem,
  ChartTooltipModel,
} from 'chart.js';

import {ExtendedChartType} from './extended-chart-type';


// We only need to set canvasDataUrl of the AjfChartWidgetInstance here,
// avoid importing the actual interface because of the circular dependency:
interface ChartWidgetInstance {
  canvasDataUrl?(): string;
}


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
  @Input() instance: ChartWidgetInstance;

  private _chart: Chart|null;
  private _chartCanvasElement: HTMLCanvasElement|null;
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
    if ('instance' in changes) {
      this.instance.canvasDataUrl = () => {
        if (this._chartCanvasElement == null) {
          return '';
        }
        return this._chartCanvasElement.toDataURL();
      };
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
      const ctx = this._chartCanvasElement!.getContext('2d') as CanvasRenderingContext2D;
      this._chart = new Chart(ctx, {
        type: this.chartType,
        data: this._fixData(this.chartType, this.data),
        options: this._fixChartOptions(this.options)
      });
    }
  }

  private _fixChartOptions(options: ChartOptions): ChartOptions {
    options = options || {};
    if (options.legendCallback) {
      const legendCallback = (typeof options.legendCallback === 'string' ?
                                  new Function(options.legendCallback) :
                                  options.legendCallback) as (chart: Chart) => string;
      options.legendCallback = legendCallback;
    }
    if (options.onHover) {
      const onHover =
          (typeof options.onHover === 'string' ?
               new Function(options.onHover) :
               options.onHover) as (this: Chart, event: MouseEvent, activeElements: {}[]) => any;
      options.onHover = onHover;
    }
    if (options.onClick) {
      const onClick = (typeof options.onClick === 'string' ?
                           new Function(options.onClick) :
                           options.onClick) as (event?: MouseEvent, activeElements?: {}[]) => any;
      options.onClick = onClick;
    }
    if (options.onResize) {
      const onResize = (typeof options.onResize === 'string' ?
                            new Function(options.onResize) :
                            options.onResize) as (this: Chart, newSize: ChartSize) => void;
      options.onResize = onResize;
    }
    if (options.legend) {
      const legend = options.legend;
      if (legend.onClick) {
        const onClick =
            (typeof legend.onClick === 'string' ?
                 new Function(legend.onClick) :
                 legend.onClick) as (event: MouseEvent, legendItem: ChartLegendLabelItem) => void;
        legend.onClick = onClick;
      }
      if (legend.onHover) {
        const onHover =
            (typeof legend.onHover === 'string' ?
                 new Function(legend.onHover) :
                 legend.onHover) as (event: MouseEvent, legendItem: ChartLegendLabelItem) => void;
        legend.onHover = onHover;
      }
      if (legend.onLeave) {
        const onLeave =
            (typeof legend.onLeave === 'string' ?
                 new Function(legend.onLeave) :
                 legend.onLeave) as (event: MouseEvent, legendItem: ChartLegendLabelItem) => void;
        legend.onLeave = onLeave;
      }
      if (legend.labels) {
        const labels = legend.labels;
        if (labels.generateLabels) {
          const generateLabels = (typeof labels.generateLabels === 'string' ?
                                      new Function(labels.generateLabels) :
                                      labels.generateLabels) as (chart: Chart) =>
                                     ChartLegendLabelItem[];
          labels.generateLabels = generateLabels;
        }
        if (labels.filter) {
          const filter =
              (typeof labels.filter === 'string' ? new Function(labels.filter) : labels.filter) as (
                  legendItem: ChartLegendLabelItem, data: ChartData) => any;
          labels.filter = filter;
        }
      }
    }
    if (options.tooltips) {
      const tooltips = options.tooltips;
      if (tooltips.custom) {
        const custom = (typeof tooltips.custom === 'string' ?
                            new Function(tooltips.custom) :
                            tooltips.custom) as (tooltipModel: ChartTooltipModel) => void;
        tooltips.custom = custom;
      }
      if (tooltips.callbacks) {
        const callbacks = tooltips.callbacks;
        for (const key in callbacks) {
          const callback = (callbacks as any)[key] as (item: ChartTooltipItem[], data: ChartData) =>
                               string | string[];
          (callbacks as any)[key] =
              typeof callback === 'string' ? new Function(callback) : callback;
        }
      }
      if (tooltips.filter) {
        type FilterFn = (item: ChartTooltipItem, data: ChartData) => boolean;
        const filter = (typeof tooltips.filter === 'string' ? new Function(tooltips.filter) :
                                                              tooltips.filter) as FilterFn;
        tooltips.filter = filter;
      }
      if (tooltips.itemSort) {
        type SortFn = (itemA: ChartTooltipItem, itemB: ChartTooltipItem, data?: ChartData) =>
            number;
        const itemSort = (typeof tooltips.itemSort === 'string' ? new Function(tooltips.itemSort) :
                                                                  tooltips.itemSort) as SortFn;
        tooltips.itemSort = itemSort;
      }
    }
    if (options.hover) {
      const hover = options.hover;
      if (hover.onHover) {
        const onHover =
            (typeof hover.onHover === 'string' ? new Function(hover.onHover) : hover.onHover) as (
                this: Chart, event: MouseEvent, activeElements: {}[]) => any;
        hover.onHover = onHover;
      }
    }
    if (options.animation) {
      const animation = options.animation;
      if (animation.onProgress) {
        const onProgress = (typeof animation.onProgress === 'string' ?
                                new Function(animation.onProgress) :
                                animation.onProgress) as (chart: any) => void;
        animation.onProgress = onProgress;
      }
      if (animation.onComplete) {
        const onComplete = (typeof animation.onComplete === 'string' ?
                                new Function(animation.onComplete) :
                                animation.onComplete) as (chart: any) => void;
        animation.onComplete = onComplete;
      }
    }
    if (options.scales == null) {
      options.scales = {xAxes: [], yAxes: []};
    }
    if (options.scales.xAxes == null) {
      options.scales.xAxes = [];
    }
    if (options.scales.yAxes == null) {
      options.scales.yAxes = [];
    }
    options.scales.yAxes.forEach((yAxe) => {
      if (yAxe.ticks && yAxe.ticks.callback) {
        const callback = (typeof yAxe.ticks.callback === 'string' ?
                              new Function(yAxe.ticks.callback) :
                              yAxe.ticks.callback) as (value: any, index: any, values: any) =>
                             string | number;
        yAxe.ticks.callback = callback;
      }
    });
    options.scales.xAxes.forEach((xAxe) => {
      if (xAxe.ticks && xAxe.ticks.callback) {
        const callback = (typeof xAxe.ticks.callback === 'string' ?
                              new Function(xAxe.ticks.callback) :
                              xAxe.ticks.callback) as (value: any, index: any, values: any) =>
                             string | number;
        xAxe.ticks.callback = callback;
      }
    });
    if (this.chartType == 'pie') {
      let newOptions = <any>options;
      newOptions.pieceLabel = {...{
        render: function(args: any) {
          if (args.label) {
            return args.label + ':' + args.value;
          } else {
            return args.value;
          }
        }, ...newOptions.pieceLabel},
        position: 'outside'
      };
      return newOptions;
    }
    return options;
  }
}
