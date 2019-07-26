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

import {AnimationBuilder} from '@angular/animations';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ContentChildren, Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';

import {AjfPageSlider as AjfCorePageSlider, AjfPageSliderItem} from '@ajf/core/page-slider';

@Component({
  moduleId: module.id,
  selector: 'ajf-page-slider',
  templateUrl: 'page-slider.html',
  styleUrls: ['page-slider.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['duration', 'currentPage', 'hideNavigationButtons', 'orientation', 'fixedOrientation'],
  outputs: ['pageScrollFinish', 'orientationChange'],
  queries: {
    pages: new ContentChildren(AjfPageSliderItem),
    body: new ViewChild('body', {static: true})
  },
})
export class AjfPageSlider extends AjfCorePageSlider {
  constructor(animationBuilder: AnimationBuilder, cdr: ChangeDetectorRef, renderer: Renderer2) {
    super(animationBuilder, cdr, renderer);
  }
}
