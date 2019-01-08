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
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  EventEmitter, Output, Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';

import {Observable} from 'rxjs';
import {debounceTime, filter, map, scan} from 'rxjs/operators';

import {AjfPageSliderSlideDirection} from './page-slider-slide-options';

@Component({
  moduleId: module.id,
  selector: 'ajf-page-slider-item',
  templateUrl: 'page-slider-item.html',
  styleUrls: ['page-slider-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfPageSliderItem {
  @ViewChild('container') container: ElementRef;
  @Output() pageScroll: Observable<AjfPageSliderSlideDirection>;

  private _scrollEvt: EventEmitter<number> = new EventEmitter<number>();
  private _panPosition: number;

  constructor(private _cdr: ChangeDetectorRef, private _renderer: Renderer2) {
    const scrollLimit = 500;

    this.pageScroll = this._scrollEvt.pipe(
      scan((acc, cur) => {
        acc = acc % scrollLimit;
        if ((acc <= 0 && cur < 0 ) || (acc >= 0 && cur > 0)) {
          return acc + cur;
        }
        return 0;
      }, 0),
      filter(v => Math.abs(v) > scrollLimit),
      map(v => (v > 0 ? 'down' : 'up') as AjfPageSliderSlideDirection),
      debounceTime(100),
    );
  }

  detach(): void {
    this._cdr.detach();
  }

  reattach(): void {
    this._cdr.reattach();
  }

  mousewheelHandler(evt: MouseWheelEvent) {
    this._scrollHandler(evt, evt.deltaY);
  }

  panMoveHandler(evt: any): void {
    if (evt.stopPropagation != null) {
      evt.stopPropagation();
    }
    if (evt.srcEvent.stopPropagation != null) {
      evt.srcEvent.stopPropagation();
    }
    if (evt.preventDefault != null) {
      evt.preventDefault();
    }
    if (this.container == null) { return; }
    const container = this.container.nativeElement;
    const oldScroll = this._panPosition;
    const newScroll = oldScroll - evt.deltaY;
    const maxScroll = container.scrollHeight - container.offsetHeight;
    if (newScroll > 0 && newScroll <= maxScroll) {
      this._renderer.setProperty(container, 'scrollTop', newScroll);
    } else if (newScroll <= 0 || newScroll >= maxScroll) {
      evt.preventDefault();
    }
  }

  panStartHandler(_evt: any): void {
    if (this.container == null) { return; }
    const container = this.container.nativeElement;
    this._panPosition = container.scrollTop;
  }

  private _scrollHandler(evt: any, deltaY: number): void {
    if (evt.stopPropagation != null) {
      evt.stopPropagation();
    } else if (evt.gesture != null && evt.gesture.stopPropagation != null) {
      evt.gesture.stopPropagation();
    }
    if (this.container == null) { return; }
    const container = this.container.nativeElement;
    const oldScroll = container.scrollTop;
    const newScroll = oldScroll + deltaY;
    if (deltaY === 0) { return; }
    const positionReference = container.scrollHeight - oldScroll;
    const endSlideTreshold = 10;
    if (newScroll <= endSlideTreshold && oldScroll > endSlideTreshold) {
      this._renderer.setProperty(container, 'scrollTop', newScroll);
      return;
    }
    if (newScroll <= endSlideTreshold) {
      this._renderer.setProperty(container, 'scrollTop', 0);
      evt.preventDefault();
      this._scrollEvt.emit(newScroll);
      return;
    }
    const maxScroll = container.scrollHeight - container.offsetHeight;
    if (newScroll >= maxScroll &&
        (positionReference) > (container.offsetHeight + endSlideTreshold)) {
      this._renderer.setProperty(container, 'scrollTop', newScroll);
      return;
    }
    if (newScroll >= maxScroll) {
      this._renderer.setProperty(container, 'scrollTop', maxScroll);
      evt.preventDefault();
      this._scrollEvt.emit(newScroll - maxScroll);
      return;
    }
  }
}
