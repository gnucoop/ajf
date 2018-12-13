/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
  ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation
} from '@angular/core';

import {AjfPageSliderItem as AjfCorePageSliderItem} from '@ajf/core/page-slider';


@Component({
  moduleId: module.id,
  selector: 'ajf-page-slider-item',
  styleUrls: ['page-slider-item.css'],
  templateUrl: 'page-slider-item.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  outputs: ['parentScroll']
})
export class AjfPageSliderItem extends AjfCorePageSliderItem {
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
  }
}
