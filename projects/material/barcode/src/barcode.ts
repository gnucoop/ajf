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

import {AjfBarcode} from '@ajf/core/barcode';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export const BARCODE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AjfBarcodeComponent),
  multi: true,
};

/**
 * Ajf barcode component.
 */
@Component({
  selector: 'ajf-barcode',
  templateUrl: 'barcode.html',
  styleUrls: ['barcode.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BARCODE_CONTROL_VALUE_ACCESSOR],
})
export class AjfBarcodeComponent extends AjfBarcode implements OnDestroy, AfterViewInit {
  sourceSelectSub: Subscription = Subscription.EMPTY;
  resetSub: Subscription = Subscription.EMPTY;
  constructor(cdr: ChangeDetectorRef, renderer: Renderer2) {
    super(cdr, renderer);
    this.resetSub = this.resetEvt.subscribe(() => this.setupVideoSourceSub());
  }

  setupVideoSourceSub() {
    if (this.videoSourceSelect == undefined) return;
    this.sourceSelectSub.unsubscribe();
    this.sourceSelectSub = this.videoSourceSelect.valueChange
      .pipe(switchMap(() => this.getStream()))
      .subscribe(c => console.log(c));
  }

  ngAfterViewInit(): void {
    this.initVideoStreams();
    this.setupVideoSourceSub();
  }

  ngOnDestroy(): void {
    console.log('a');
    this.stopCurrentStream();
    this.sourceSelectSub.unsubscribe();
    this.resetSub.unsubscribe();
  }
}
