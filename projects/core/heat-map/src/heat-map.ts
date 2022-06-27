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

import {AjfEchartsInitEvent, EchartsModule} from '@ajf/core/echarts';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {Feature, FeatureCollection, Geometry} from 'geojson';

let heatMapIdx = 0;

export type AjfHeatMapFeature = Feature<Geometry, {[name: string]: any}>;
export type AjfHeatMapFeatureCollection = FeatureCollection<Geometry, {[name: string]: any}>;

export interface AjfHeatMapFeatureSelected {
  feature: AjfHeatMapFeature;
}

interface SelectChanged {
  selected: {
    dataIndex: number[];
    seriesIndex: number;
  }[];
}

@Component({
  selector: 'ajf-heat-map',
  templateUrl: 'heat-map.html',
  styleUrls: ['heat-map.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfHeatMap implements OnChanges, OnDestroy {
  @Input()
  set features(features: AjfHeatMapFeatureCollection | undefined) {
    this._features = features;
  }
  private _features?: AjfHeatMapFeatureCollection;

  @Input()
  set startColor(startColor: string) {
    this._startColor = startColor;
  }
  private _startColor = '#ffeb3b';

  @Input()
  set endColor(endColor: string) {
    this._endColor = endColor;
  }
  private _endColor = '#f44336';

  @Input()
  set highlightColor(highlightColor: string) {
    this._highlightColor = highlightColor;
  }
  private _highlightColor = '#009688';

  @Input()
  set values(values: string | number[]) {
    this._values = values;
  }
  private _values: string | number[] = 'properties.value';

  @Input()
  set idProp(idProp: string) {
    this._idProp = idProp;
  }
  private _idProp = 'id';

  @Input()
  set showVisualMap(showVisualMap: BooleanInput) {
    this._showVisualMap = coerceBooleanProperty(showVisualMap);
  }
  private _showVisualMap = false;

  @Output()
  readonly featureSelected = new EventEmitter<AjfHeatMapFeatureSelected>();

  get chartOptions(): echarts.EChartsOption | undefined {
    return this._chartOptions;
  }
  private _chartOptions?: echarts.EChartsOption;
  private _name = `ajf_heatmap_${heatMapIdx++}`;
  private _echarts?: EchartsModule;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnChanges(_: SimpleChanges): void {
    this._updateChartOptions();
  }

  ngOnDestroy(): void {
    this.featureSelected.complete();
  }

  onChartInit(event: AjfEchartsInitEvent): void {
    const {echarts, chart} = event;
    this._echarts = echarts;
    chart.on('selectchanged', params => {
      if (this._features == null) {
        return;
      }
      const {selected} = params as SelectChanged;
      if (selected == null || selected.length !== 1) {
        return;
      }
      const {dataIndex, seriesIndex} = selected[0];
      if (seriesIndex !== 0 || dataIndex.length !== 1) {
        return;
      }
      const idx = dataIndex[0];
      if (idx < 0 || idx >= this._features.features.length) {
        return;
      }
      const feature = this._features.features[idx];
      this.featureSelected.emit({feature});
    });
    this._updateChartOptions();
  }

  private _updateChartOptions(): void {
    if (this._echarts == null) {
      return;
    }
    if (this._features == null) {
      this._chartOptions = undefined;
    } else {
      this._echarts.registerMap(this._name, this._features as any);
      this._chartOptions = {
        geo: {
          map: this._name,
          itemStyle: {
            opacity: 0,
          },
          nameProperty: this._idProp,
        },
        visualMap: {
          calculable: false,
          realtime: false,
          inRange: {
            color: [this._startColor, this._endColor],
          },
          showLabel: false,
          show: this._showVisualMap,
        },
        series: this._getChartSeries(),
      };
    }
    this._cdr.detectChanges();
  }

  private _getChartSeries(): echarts.MapSeriesOption[] {
    const data = this._getFeaturesData();
    if (data.length === 0) {
      return [];
    }
    return [
      {
        type: 'map',
        map: this._name,
        nameProperty: this._idProp,
        emphasis: {
          itemStyle: {
            areaColor: this._highlightColor,
          },
          label: {
            show: false,
          },
        },
        select: {
          itemStyle: {
            color: this._highlightColor,
          },
          label: {
            show: false,
          },
        },
        selectedMode: 'single',
        data,
      },
    ];
  }

  private _getFeaturesData(): {name: string; value: number}[] {
    if (this._features == null) {
      return [];
    }
    const {features} = this._features;
    const values = this._values;
    if (typeof values === 'string') {
    } else if (values.length === features.length) {
      return features.map((feature, idx) => {
        const idProp = feature.properties[this._idProp] as string;
        return {
          name: idProp,
          value: values[idx],
        } as any;
      });
    }
    return [];
  }
}
