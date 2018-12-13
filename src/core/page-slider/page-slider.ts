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
  AfterContentInit, ElementRef, EventEmitter, OnDestroy, Renderer2, QueryList
} from '@angular/core';

import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {filter, map, scan} from 'rxjs/operators';

import {coerceBooleanProperty} from '@ajf/core/utils';

import {IAjfEasingFunction} from './easing';
import {AjfPageSliderConfig} from './page-slider-config';
import {AjfPageSliderItem} from './page-slider-item';


export abstract class AjfPageSlider implements AfterContentInit, OnDestroy {
  pageScrollOffset: number;
  pageScrollDuration: number;
  pageScrollEasing: IAjfEasingFunction;
  pageScrollInterruptible: boolean;
  currentItem = 0;

  items: QueryList<AjfPageSliderItem>;
  sliderContentChild: ElementRef;

  private _currentItemPosition: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly currentItemPosition: Observable<number> = this._currentItemPosition.asObservable();

  private _itemsNum: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly itemsNum: Observable<number> = this._itemsNum.asObservable();

  private _pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly pageScrollFinish: Observable<boolean> = this._pageScrollFinish.asObservable();

  private _ready: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly ready: Observable<boolean> = this._ready.asObservable();

  private _showNavigationButtons = true;
  get showNavigationButtons(): boolean { return this._showNavigationButtons; }
  set showNavigationButtons(showNavigationButtons: boolean) {
    this._showNavigationButtons = coerceBooleanProperty(showNavigationButtons);
  }

  private _timer: Subscription = Subscription.EMPTY;
  private _itemsSubscription: Subscription = Subscription.EMPTY;

  private _scrolling = false;

  private _mouseWheel: EventEmitter<number> = new EventEmitter<number>();
  private _mouseWheelSubscription: Subscription = Subscription.EMPTY;
  private _parentScrollSubscriptions: {[counter: number]: Subscription} = {};
  private _sliderContent: HTMLElement;

  private getHeight(): number {
    if (this._sliderContent != null) {
      return this._sliderContent.offsetHeight - this._sliderContent.offsetTop;
    }
    return 0;
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    const scrollLimit = 150;
    this._mouseWheelSubscription = (<Observable<number>>this._mouseWheel).pipe(
      scan((curSum, curValue) => {
        curSum = curSum % scrollLimit;
        if ((curSum <= 0 && curValue < 0) || (curSum >= 0 && curValue > 0)) {
          return curSum + curValue;
        }
        return 0;
      }, 0),
      filter(v => Math.abs(v) > scrollLimit),
      map(v => v > 0)
    ).subscribe(v => this.scrollTo(v));
  }

  ngAfterContentInit(): void {
    this._sliderContent = this.sliderContentChild.nativeElement;

    this._itemsSubscription = this.items.changes.subscribe(() => {
      this._itemsNum.next(this.items.length);
      this._adjustItems();
    });

    setTimeout(() => {
      this._adjustItems();
    });

    if (this.currentItem == null || this.currentItem >  this.items.length) {
      this.currentItem = 0;
    }
    if (this.currentItem !== 0 && this.items.length > 0 && this.currentItem < this.items.length) {
      const itemsArr = this.items.toArray();
      const curItem = itemsArr[this.currentItem];
      const anchorTarget = curItem.el ? curItem.el.nativeElement : null;
      if (anchorTarget == null) { return; }
      let pageScrollOffset: number = this.pageScrollOffset == null
        ? AjfPageSliderConfig.defaultScrollOffset : this.pageScrollOffset * this.currentItem;
      let targetScrollTop: number = anchorTarget.offsetTop - pageScrollOffset;
      this._sliderContent.scrollTop = targetScrollTop;
    }
    this._renderer.addClass(this._elementRef.nativeElement, 'ajf-loaded');
    this._ready.emit(true);
  }

  onResize(): void {
    this._adjustItems();
  }

  ngOnDestroy(): void {
    this._timer.unsubscribe();
    this._mouseWheelSubscription.unsubscribe();
    this._itemsSubscription.unsubscribe();
    Object.keys(this._parentScrollSubscriptions)
      .forEach((k) => {
        const s = this._parentScrollSubscriptions[parseInt(k, 10)];
        s.unsubscribe();
      });
  }

  scrollTo(next?: boolean, nextId?: number): void {
    let currentItems = this.items.toArray();

    if ((next == null) && (nextId == null)) {
      next = true;
    }

    if (nextId != null && (nextId >= currentItems.length || nextId && nextId < 0)) {
      return;
    }

    const hasNext = this.currentItem + 1 < currentItems.length;
    const hasPrevious = this.currentItem > 0;
    if (this._scrolling || (next && !hasNext && nextId == null) ||
      (!next && !hasPrevious && nextId == null )) {
      return;
    }

    let anchorTarget;
    if (nextId != undefined && nextId >= 0 && currentItems[nextId] && currentItems[nextId].el) {
      anchorTarget = currentItems[nextId].el.nativeElement;
    } else {
      const elNum = this.currentItem + (next ? 1 : -1);
      if (currentItems[elNum] && currentItems[elNum].el) {
        anchorTarget = currentItems[elNum].el.nativeElement;
      }
    }

    if (anchorTarget == null) {
      // Target not found, so stop
      return;
    }

    let nMoves = (nextId ? (this.currentItem + (nextId >= this.currentItem ?
      this.currentItem - nextId : nextId - this.currentItem)) : 1);
    let pageScrollOffset: number = this.pageScrollOffset == null
      ? AjfPageSliderConfig.defaultScrollOffset : this.pageScrollOffset * nMoves;
    let targetScrollTop: number = anchorTarget.offsetTop - pageScrollOffset;
    let startScrollTop: number = this._sliderContent.scrollTop;

    let distanceToScroll: number = targetScrollTop - startScrollTop;
    if (distanceToScroll === 0) {
      // We're at the final destination already, so stop
      return;
    }
    let startTime: number = new Date().getTime();

    let intervalConf: any = {
      startScrollTop: startScrollTop,
      targetScrollTop: targetScrollTop,
      distanceToScroll: distanceToScroll,
      startTime: startTime,
      easing: this.pageScrollEasing == null
        ? AjfPageSliderConfig.defaultEasingFunction
        : this.pageScrollEasing
    };
    intervalConf.duration =
      this.pageScrollDuration == null
        ? AjfPageSliderConfig.defaultDuration : this.pageScrollDuration;
    intervalConf.endTime = intervalConf.startTime + intervalConf.duration;

    if (intervalConf.duration <= AjfPageSliderConfig._interval) {
      // We should go there directly, as our "animation" would have one big step
      // only anyway and this way we save the interval stuff
      this._renderer.setProperty(
        this._sliderContent, 'scrollTop', intervalConf.targetScrollTop
      );
      this._stopInterval(false, next, nextId);
      return;
    }

    this._scrolling = true;

    this._timer = timer(0, AjfPageSliderConfig._interval)
      .subscribe(() => {
        this._intervalAnimation(intervalConf, next, nextId);
      });
  }

  swipeHandler(evt: any): void {
    this._scrollHandler(evt, -(evt.deltaY));
  }

  wheelHandler(evt: any): void {
    this._scrollHandler(evt, evt.deltaY);
  }

  private _adjustItems(): void {
    const height: number = this.getHeight() - 48;
    const curSubscriberItems = Object.keys(this._parentScrollSubscriptions);

    this.items.forEach((item, idx) => {
      item.position = idx + 1;
      if (curSubscriberItems.indexOf(`${item.counter}`) == -1) {
        this._subscribeToParentScroll(item);
      }
      item.adjustMargin(height);
    });
  }

  private _intervalAnimation(conf: any, nextSlide?: boolean, nextId?: number) {
    let currentTime: number = new Date().getTime();
    let newScrollTop: number;

    if (conf.endTime <= currentTime) {
      this._stopInterval(false, nextSlide, nextId);
      newScrollTop = conf.targetScrollTop;
    } else {
      newScrollTop = conf.easing(
        currentTime - conf.startTime,
        conf.startScrollTop,
        conf.distanceToScroll,
        conf.duration);
    }
    this._renderer.setProperty(this._sliderContent, 'scrollTop', newScrollTop);
  }

  private _stopInterval(interrupted: boolean, next = true, nextId: number | null = null): boolean {
    if (this._timer && !this._timer.closed) {
      this._scrolling = false;

      this._timer.unsubscribe();

      this.currentItem = (nextId != null ? nextId :
        (next ? this.currentItem + 1 : this.currentItem - 1));
      this._currentItemPosition.next(this.currentItem);

      this._pageScrollFinish.emit(!interrupted);
      return true;
    }
    return false;
  }

  private _scrollHandler(evt: any, delta: number): void {
    if (evt.stopPropagation != null) {
      evt.stopPropagation();
    } else if (evt.srcEvent != null && evt.srcEvent.stopPropagation != null) {
      evt.srcEvent.stopPropagation();
    }
    evt.preventDefault();

    if (delta !== 0) {
      this._mouseWheel.emit(delta);
    }
  }

  private _subscribeToParentScroll(itm: AjfPageSliderItem): void {
    this._parentScrollSubscriptions[itm.counter] = itm.parentScroll
      .subscribe((dir) => {
        this.scrollTo(dir);
      });
  }
}
