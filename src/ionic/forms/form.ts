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

import {AjfFormRenderer as AjfCoreFormRenderer, AjfFormRendererService} from '@ajf/core/forms';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Subscription} from 'rxjs';
import {delayWhen, switchMap} from 'rxjs/operators';


import {AjfFormField} from './field';

@Component({
  selector: 'ajf-form',
  templateUrl: 'form.html',
  styleUrls: ['form.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [
    'hasStartMessage',
    'hasEndMessage',
    'readonly',
    'form',
    'formSchema',
    'saveDisabled',
    'title',
    'showTopToolbar',
    'showBottomToolbar',
    'showNavigationButtons',
    'orientation',
    'fixedOrientation',
  ],
  outputs: [
    'formSave',
    'formAction',
    'orientationChange',
  ],
  queries: {
    formSlider: new ViewChild('formSlider', {static: false}),
    fields: new ViewChildren(AjfFormField)
  }
})
/**
 * This class will define an ajf form renderer
 * @implements : AfterViewInit
 * @implements : AfterViewInit
 */
export class AjfFormRenderer extends AjfCoreFormRenderer implements AfterViewInit, OnDestroy {
  private _longSlide = false;
  get longSlide(): boolean { return this._longSlide; }

  private _viewInitEvt: EventEmitter<void> = new EventEmitter<void>();
  private _scrollFinishSub: Subscription = Subscription.EMPTY;

  constructor(
    rendererService: AjfFormRendererService,
    cdr: ChangeDetectorRef
  ) {
    super(rendererService, cdr);

    this._scrollFinishSub = this._viewInitEvt.pipe(
      delayWhen(() => this.formGroup),
      switchMap(() => this.formSlider.pageScrollFinish),
    ).subscribe(_ => this._updateLongSlide());
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._viewInitEvt.emit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._scrollFinishSub.unsubscribe();
  }

  private _updateLongSlide(): void {
    const longSlide = this.formSlider.isCurrentPageLong();
    if (longSlide !== this._longSlide) {
      this._longSlide = longSlide;
      this._changeDetectorRef.markForCheck();
    }
  }

  static ngAcceptInputType_fixedOrientation: BooleanInput;
  static ngAcceptInputType_hasEndMessage: BooleanInput;
  static ngAcceptInputType_hasStartMessage: BooleanInput;
  static ngAcceptInputType_hideBottomToolbar: BooleanInput;
  static ngAcceptInputType_hideNavigationButtons: BooleanInput;
  static ngAcceptInputType_hideTopToolbar: BooleanInput;
  static ngAcceptInputType_saveDisabled: BooleanInput;
  static ngAcceptInputType_readonly: BooleanInput;
}
