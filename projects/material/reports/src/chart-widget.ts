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

import {AjfBaseWidgetComponent, AjfChartWidgetInstance} from '@ajf/core/reports';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  templateUrl: 'chart-widget.html',
  styleUrls: ['chart-widget.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfChartWidgetComponent extends AjfBaseWidgetComponent<AjfChartWidgetInstance> {
  /**
   * When specified, this number of different single data entries will be displayed as separate
   * options/bars/slices in the chart. The rest will be displayed as an aggregate "other" option/bar/slice.
   */
  @Input() mainDataNumberThreshold?: number = 10;

  constructor(cdr: ChangeDetectorRef, el: ElementRef) {
    super(cdr, el);
  }
}
