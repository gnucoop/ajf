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
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {IonSlides} from '@ionic/angular';
import {Subscription} from 'rxjs';

export const BARCODE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AjfBarcodeComponent),
  multi: true,
};

@Component({
  selector: 'ajf-barcode',
  templateUrl: 'barcode.html',
  styleUrls: ['barcode.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BARCODE_CONTROL_VALUE_ACCESSOR],
})
export class AjfBarcodeComponent extends AjfBarcode implements AfterViewInit, OnDestroy {
  @ViewChild(IonSlides) slides!: IonSlides;

  private _currentTab = 'image';
  get currentTab(): string {
    return this._currentTab;
  }

  private _slidesSub = Subscription.EMPTY;

  constructor(cdr: ChangeDetectorRef, renderer: Renderer2) {
    super(cdr, renderer);
  }

  ngAfterViewInit(): void {
    if (this.slides == null) {
      return;
    }
    const slides = this.slides;
    this._slidesSub = slides.ionSlideDidChange.subscribe(() => {
      slides.getActiveIndex().then(idx => {
        const currentTab = idx === 0 ? 'image' : 'camera';
        if (this._currentTab !== currentTab) {
          this._currentTab = currentTab;
          this._cdr.markForCheck();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._slidesSub.unsubscribe();
  }

  selectTab(tab: 'image' | 'camera'): void {
    const idx = tab === 'image' ? 0 : 1;
    this._currentTab = tab;
    this.onTabChange(idx);
    if (this.slides != null) {
      this.slides.slideTo(idx);
    }
    this._cdr.markForCheck();
  }
}
