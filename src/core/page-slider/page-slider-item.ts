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

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ResizeSensor} from 'css-element-queries';
import {Observable, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {AjfPageSliderItemScrollDirection} from './page-slider-item-scroll-direction';

@Component({
  selector: 'ajf-page-slider-item',
  templateUrl: 'page-slider-item.html',
  styleUrls: ['page-slider-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfPageSliderItem implements OnDestroy {
  @ViewChild('wrapper', {static: true}) wrapper: ElementRef;
  @ViewChild('content', {static: true}) content: ElementRef;

  private _scrollEvt = new EventEmitter<{x: number, y: number}>();
  @Output()
  readonly scroll: Observable<{x: number, y: number}> =
      this._scrollEvt as Observable<{x: number, y: number}>;

  private _scrollX = 0;
  private _scrollY = 0;
  private _resizeSensor: ResizeSensor;
  private _resizeEvent: EventEmitter<void> = new EventEmitter<void>();
  private _resizeSub: Subscription = Subscription.EMPTY;

  constructor(
      private _el: ElementRef,
      private _renderer: Renderer2,
  ) {
    this._resizeSensor = new ResizeSensor(_el.nativeElement, () => this._onResize());

    this._resizeSub = this._resizeEvent
                          .pipe(
                              debounceTime(300),
                              )
                          .subscribe(() => this._fixScrollOnResize());
  }

  ngOnDestroy(): void {
    if (this._resizeSensor) {
      this._resizeSensor.detach();
    }
    this._resizeSub.unsubscribe();
    this._resizeEvent.complete();
  }

  setScroll(dir: AjfPageSliderItemScrollDirection, amount: number, _duration: number): boolean {
    if (this._el == null || this.wrapper == null || amount === 0) {
      return false;
    }
    const el = this._el.nativeElement;
    const wrapper = this.wrapper.nativeElement;
    let containerSize, wrapperSize, currentScroll;
    if (dir === 'x') {
      containerSize = el.clientWidth;
      wrapperSize = wrapper.clientWidth;
      currentScroll = this._scrollX;
    } else {
      containerSize = el.clientHeight;
      wrapperSize = wrapper.clientHeight;
      currentScroll = this._scrollY;
    }
    const maxScroll = containerSize - wrapperSize;
    if (wrapperSize <= containerSize || (currentScroll === maxScroll && amount < 0) ||
        (currentScroll === 0 && amount > 0)) {
      return false;
    }
    if (amount < 0) {
      if (dir === 'x') {
        this._scrollX = Math.max(maxScroll, this._scrollX + amount);
      } else {
        this._scrollY = Math.max(maxScroll, this._scrollY + amount);
      }
    } else {
      if (dir === 'x') {
        this._scrollX = Math.min(0, this._scrollX + amount);
      } else {
        this._scrollY = Math.min(0, this._scrollY + amount);
      }
    }
    this._renderer.setStyle(
        wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
    this._scrollEvt.emit({x: this._scrollX, y: this._scrollY});
    return true;
  }

  private _onResize(): void {
    this._resizeEvent.emit();
  }

  private _fixScrollOnResize(): void {
    if (this.content == null || this.wrapper == null) {
      return;
    }
    const content = this.content.nativeElement;
    const wrapper = this.wrapper.nativeElement;
    const maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
    const maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
    if (maxScrollX !== 0 || maxScrollY !== 0 || (maxScrollX === 0 && this._scrollX !== 0) ||
        (maxScrollY === 0 && this._scrollY !== 0)) {
      this._scrollX = Math.max(
          maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
      this._scrollY =
          Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
      content.scrollTop = content.scrollLeft = 0;
      this._renderer.setStyle(
          wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
      this._scrollEvt.emit({x: this._scrollX, y: this._scrollY});
    }
  }
}
