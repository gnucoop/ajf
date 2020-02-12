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

import {AjfPageSlider as AjfCorePageSlider, AjfPageSliderItem} from '@ajf/core/page-slider';
import {AnimationBuilder} from '@angular/animations';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ContentChildren, ElementRef, OnDestroy, Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';
import {merge, Subscription} from 'rxjs';
import {filter, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'ajf-page-slider',
  templateUrl: 'page-slider.html',
  styleUrls: ['page-slider.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['duration', 'currentPage', 'hideNavigationButtons', 'orientation', 'fixedOrientation'],
  outputs: ['pageScrollFinish', 'orientationChange'],
  queries: {
    pages: new ContentChildren(AjfPageSliderItem, {descendants: true}),
    body: new ViewChild('body', {static: true}),
  },
})
export class AjfPageSlider extends AjfCorePageSlider implements AfterContentInit, OnDestroy {
  private _scrollSub = Subscription.EMPTY;

  constructor(
    animationBuilder: AnimationBuilder,
    cdr: ChangeDetectorRef,
    renderer: Renderer2,
    private _el: ElementRef,
  ) {
    super(animationBuilder, cdr, renderer);
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this._scrollSub = this.pages.changes.pipe(
      map(() => this.pages.toArray()),
      startWith(this.pages.toArray()),
      filter(pages => pages.length > 0),
      switchMap(pages => merge(...pages.map(page => page.scroll))),
    ).subscribe(() => {
      this._fixRippleFromRadioButton();
      this._fixToggleButtons();
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._scrollSub.unsubscribe();
  }

  private _fixRippleFromRadioButton(): void {
    try {
      const el = this._el.nativeElement as HTMLElement;
      const radioGroups = el.getElementsByTagName('ion-radio-group');
      const radioGroup = radioGroups[0];
      const items = radioGroup.getElementsByTagName('ion-item');
      const item = items[0];
      const ripples = item.shadowRoot!.firstElementChild!
        .getElementsByTagName('ion-ripple-effect');
      const ripple = ripples.item(0) as HTMLIonRippleEffectElement;
      const orig = ripple.style.opacity;
      ripple.style.opacity = '0';
      ripple.addRipple(0, 0).then(remove => {
        remove();
        ripple.style.opacity = orig;
      });
    } catch (e) { }
  }

  private _fixToggleButtons(): void {
    try {
      const el = this._el.nativeElement as HTMLElement;
      const toggleButtons = el.getElementsByTagName('ion-toggle');
      const toggleButtonsNum = toggleButtons.length;
      for (let i = 0; i < toggleButtonsNum; i++) {
        const toggleButton = toggleButtons.item(i) as HTMLIonToggleElement;
        const inners = toggleButton.shadowRoot!.firstElementChild!
          .getElementsByClassName('toggle-inner');
        const inner = inners[0] as HTMLDivElement;
        inner.setAttribute('style', 'will-change: auto');
        setTimeout(() => {
          try {
            inner.removeAttribute('style');
          } catch (e) { }
        }, 0);
      }
    } catch (e) { }
  }

  static ngAcceptInputType_fixedOrientation: BooleanInput;
  static ngAcceptInputType_hideNavigationButtons: BooleanInput;
}
