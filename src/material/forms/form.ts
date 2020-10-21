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

import {AjfFormRenderer as AjfCoreFormRenderer, AjfFormRendererService} from '@ajf/core/forms';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ajf-form',
  templateUrl: 'form.html',
  styleUrls: ['form.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfFormRenderer extends AjfCoreFormRenderer {
  @Input() topBar: boolean = false;

  constructor(rendererService: AjfFormRendererService, changeDetectorRef: ChangeDetectorRef) {
    super(rendererService, changeDetectorRef);
  }

  scrollToSlide(slide: any): void {
    this.formSlider.slide({to: slide.position - 1});
  }

  static ngAcceptInputType_fixedOrientation: BooleanInput;
  static ngAcceptInputType_hasEndMessage: BooleanInput;
  static ngAcceptInputType_hasStartMessage: BooleanInput;
  static ngAcceptInputType_hideBottomToolbar: BooleanInput;
  static ngAcceptInputType_hideNavigationButtons: BooleanInput;
  static ngAcceptInputType_hideTopToolbar: BooleanInput;
  static ngAcceptInputType_readonly: BooleanInput;
  static ngAcceptInputType_saveDisabled: BooleanInput;
}
