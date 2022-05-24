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

/// <reference types="resize-observer-browser" />

import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import type {ECharts, EChartsOption} from 'echarts';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {AjfEchartsProvider, AJF_ECHARTS_PROVIDER, EchartsModule} from './echarts-config';

export type EChartsRenderer = 'canvas' | 'svg';

export interface AjfEchartsInitEvent {
  echarts: EchartsModule;
  chart: ECharts;
}

@Directive({selector: '[ajfEcharts]', exportAs: 'ajfEcharts'})
export class AjfEchartsDirective implements OnChanges, OnDestroy, OnInit {
  @Input()
  set theme(theme: string | object | undefined) {
    this._theme = theme;
  }
  private _theme?: string | object;

  @Input()
  set renderer(renderer: EChartsRenderer) {
    this._renderer = renderer;
  }
  private _renderer: EChartsRenderer = 'canvas';

  @Input()
  set options(options: EChartsOption | undefined) {
    this._options = options;
  }
  private _options?: EChartsOption;

  @Output()
  readonly chartInit = new EventEmitter<AjfEchartsInitEvent>();

  private _echarts?: EchartsModule;
  private _container: HTMLElement;
  private _chart?: ECharts;
  private _resizeObserver?: ResizeObserver;
  private _resizeEvent = new EventEmitter<void>();
  private _resizeSub = Subscription.EMPTY;

  constructor(
    @Inject(AJF_ECHARTS_PROVIDER) private _echartsProvider: AjfEchartsProvider,
    el: ElementRef<HTMLElement>,
    private _ngZone: NgZone,
  ) {
    this._container = el.nativeElement;
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => this._onResize());
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme'] != null || changes['renderer'] != null) {
      this._destroyChart();
      this._initChart();
    } else if (changes['options'] != null) {
      if (this._options) {
        if (this._chart != null) {
          this._chart.setOption(this._options);
        } else {
          this._initChart();
        }
      } else {
        this._destroyChart();
      }
    }
  }

  ngOnDestroy(): void {
    if (this._resizeObserver != null) {
      this._resizeObserver.unobserve(this._container);
      this._resizeObserver.disconnect();
    }
    this._resizeEvent.complete();
    this._resizeSub.unsubscribe();
    this._destroyChart();
  }

  ngOnInit(): void {
    if (this._resizeObserver != null) {
      this._resizeObserver.observe(this._container);
      this._resizeSub = this._resizeEvent
        .pipe(debounceTime(200))
        .subscribe(() => this._resizeChart());
    }
    this._ngZone.runOutsideAngular(() => {
      this._echartsProvider().then(echarts => {
        this._echarts = echarts;
        this._initChart();
      });
    });
  }

  private _destroyChart(): void {
    if (this._chart != null && !this._chart.isDisposed()) {
      this._chart.dispose();
      this._chart = undefined;
    }
  }

  private _initChart(): void {
    if (this._echarts == null) {
      return;
    }
    this._chart = this._echarts.init(this._container, this._theme, {renderer: this._renderer});
    if (this._options) {
      this._chart.setOption(this._options);
    }
    this.chartInit.emit({echarts: this._echarts, chart: this._chart});
  }

  private _onResize(): void {
    this._resizeEvent.emit();
  }

  private _resizeChart(): void {
    if (this._chart != null) {
      this._chart.resize();
    }
  }
}
