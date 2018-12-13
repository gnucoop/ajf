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
  ChangeDetectionStrategy, Component, ContentChildren, ElementRef,
  Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';

import {AjfPageSlider as AjfCorePageSlider} from '@ajf/core/page-slider';

import {AjfPageSliderItem} from './page-slider-item';

@Component({
  moduleId: module.id,
  selector: 'ajf-page-slider',
  templateUrl: 'page-slider.html',
  styleUrls: ['page-slider.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [
    'pageScrollOffset', 'pageScrollDuration', 'pageScrollEasing',
    'pageScrollInterruptible', 'currentItem', 'showNavigationButtons'
  ],
  outputs: [
    'pageScrollFinish', 'ready'
  ],
  queries: {
    items: new ContentChildren(AjfPageSliderItem),
    sliderContentChild: new ViewChild('sliderContent')
  },
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class AjfPageSlider extends AjfCorePageSlider {
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
  }
}
