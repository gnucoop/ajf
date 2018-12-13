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

import {ElementRef, EventEmitter, Renderer2} from '@angular/core';

import {Observable} from 'rxjs';
import {filter, map, scan, share} from 'rxjs/operators';


let _uniquePageSliderItemIdCounter = 0;


export abstract class AjfPageSliderItem {
  itemId =  `ajf-slider-item-${_uniquePageSliderItemIdCounter++}`;
  position: number = 0;

  readonly el: ElementRef = this._el;
  readonly counter: number = _uniquePageSliderItemIdCounter;
  readonly parentScroll: Observable<boolean>;

  get height(): number {
    if (this._el.nativeElement) {
      return this._el.nativeElement.offsetHeight;
    }
    return 0;
  }

  private _mouseWheel: EventEmitter<number> = new EventEmitter<number>();
  private _panPosition: number = 0;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    _renderer.setAttribute(_el.nativeElement, 'id', this.itemId);

    const scrollLimit = 150;
    this.parentScroll = (<Observable<number>>this._mouseWheel).pipe(
      scan((curSum, curValue) => {
        curSum = curSum % scrollLimit;
        if ((curSum <= 0 && curValue < 0) || (curSum >= 0 && curValue > 0)) {
          return curSum + curValue;
        }
        return 0;
      }, 0),
      filter(v => Math.abs(v) > scrollLimit),
      map(v => v > 0),
      share()
    );
  }

  adjustMargin(height: number) {
    this._renderer.setStyle(this._el.nativeElement, 'height', `${height}px`);
  }

  swipeHandler(evt: any): void {
    this._scrollHandler(evt, -(evt.deltaY));
  }

  wheelHandler(evt: any): void {
    this._scrollHandler(evt, evt.deltaY);
  }

  panStart(_evt: any): void {
    const card = this._getCard();
    this._panPosition = card.scrollTop;
  }

  panHandler(evt: any): void {
    if (evt.stopPropagation != null) {
      evt.stopPropagation();
    }
    if (evt.srcEvent.stopPropagation != null) {
      evt.srcEvent.stopPropagation();
    }
    if (evt.preventDefault != null) {
      evt.preventDefault();
    }
    const card = this._getCard();
    const oldScroll = this._panPosition;
    const newScroll = oldScroll - evt.deltaY;
    const maxScroll = card.scrollHeight - card.offsetHeight;
    if (newScroll > 0 && newScroll <= maxScroll) {
      this._renderer.setProperty(card, 'scrollTop', newScroll);
    } else if (newScroll <= 0 || newScroll >= maxScroll) {
      evt.preventDefault();
    }
  }

  private _scrollHandler(evt: any, deltaY: number): void {
    if (evt.stopPropagation != null) {
      evt.stopPropagation();
    } else if (evt.gesture != null && evt.gesture.stopPropagation != null) {
      evt.gesture.stopPropagation();
    }
    const card = this._getCard();
    const oldScroll = card.scrollTop;
    const newScroll = oldScroll + deltaY;
    if (deltaY == 0 || this._el == null) {
      return;
    }
    const positionReference = card.scrollHeight - oldScroll;
    const endSlideTreshold = 10;
    if (newScroll <= endSlideTreshold && oldScroll > endSlideTreshold) {
      this._renderer.setProperty(card, 'scrollTop', newScroll);
      return;
    }
    if (newScroll <= endSlideTreshold) {
      this._renderer.setProperty(card, 'scrollTop', 0);
      evt.preventDefault();
      this._mouseWheel.emit(newScroll);
      return;
    }
    const maxScroll = card.scrollHeight - card.offsetHeight;
    if (newScroll >= maxScroll &&
        (positionReference) > (card.offsetHeight + endSlideTreshold)) {
      this._renderer.setProperty(card, 'scrollTop', newScroll);
      return;
    }
    if (newScroll >= maxScroll) {
      this._renderer.setProperty(card, 'scrollTop', maxScroll);
      evt.preventDefault();
      this._mouseWheel.emit(newScroll - maxScroll);
      return;
    }
  }

  private _getCard(): any {
    return this._el.nativeElement.children[0];
  }
}
