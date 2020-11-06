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

import {animate, AnimationBuilder, style} from '@angular/animations';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {filter, map, scan, throttleTime} from 'rxjs/operators';

import {AjfPageSliderItem} from './page-slider-item';
import {AjfPageSliderSlideOptions} from './page-slider-slide-options';

export type AjfPageSliderOrientation = 'horizontal'|'vertical';

interface Point {
  x: number;
  y: number;
  time: number;
}

interface Movement {
  velocityX: number;
  velocityY: number;
  deltaX: number;
  deltaY: number;
  deltaTime: number;
}

interface MousheWheelMove {
  dir: 'x'|'y';
  amount: number;
}

@Directive()
export class AjfPageSlider implements AfterContentInit, OnDestroy {
  @ViewChild('body', {static: true}) body: ElementRef;
  @ContentChildren(AjfPageSliderItem, {descendants: true}) pages: QueryList<AjfPageSliderItem>;

  private _pageScrollFinish: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  readonly pageScrollFinish: Observable<void> = this._pageScrollFinish as Observable<void>;

  private _orientationChange: EventEmitter<AjfPageSliderOrientation> =
      new EventEmitter<AjfPageSliderOrientation>();
  @Output()
  readonly orientationChange: Observable<AjfPageSliderOrientation> =
      this._orientationChange as Observable<AjfPageSliderOrientation>;

  @Input() duration = 300;

  private _orientation: AjfPageSliderOrientation = 'horizontal';
  get orientation(): AjfPageSliderOrientation {
    return this._orientation;
  }
  @Input()
  set orientation(orientation: AjfPageSliderOrientation) {
    if (this._orientation !== orientation) {
      this._orientation = orientation;
      this._cdr.markForCheck();
      this._updateSize();
      this._restoreCurrentPage();
      this._orientationChange.emit(this._orientation);
    }
  }

  private _fixedOrientation = false;
  get fixedOrientation(): boolean {
    return this._fixedOrientation;
  }
  @Input()
  set fixedOrientation(fixedOrientation: boolean) {
    this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
    this._cdr.markForCheck();
  }

  private _currentPage = -1;
  get currentPage(): number {
    return this._currentPage;
  }
  @Input()
  set currentPage(currentPage: number) {
    if (this.pages == null || currentPage < 0 || currentPage >= this.pages.length) {
      return;
    }
    this._currentPage = currentPage;
    this._doSlide();
  }

  private _hideNavigationButtons: boolean;
  get hideNavigationButtons(): boolean {
    return this._hideNavigationButtons;
  }
  @Input()
  set hideNavigationButtons(hnb: boolean) {
    this._hideNavigationButtons = coerceBooleanProperty(hnb);
    this._cdr.markForCheck();
  }

  private _animating = false;
  private _pagesSub: Subscription = Subscription.EMPTY;

  private _currentOrigin: Point|null;
  private _mouseWheelEvt: EventEmitter<MousheWheelMove> = new EventEmitter<MousheWheelMove>();
  private _mouseWheelSub: Subscription = Subscription.EMPTY;

  constructor(
      private _animationBuilder: AnimationBuilder, private _cdr: ChangeDetectorRef,
      private _renderer: Renderer2) {
    this._mouseWheelSub =
        this._mouseWheelEvt
            .pipe(
                map(evt => {
                  const page = this._getCurrentPage();
                  if (page == null) {
                    return null;
                  }
                  return {evt, res: page.setScroll(evt.dir, evt.amount, 0)};
                }),
                filter(
                    r => r != null && r.res === false &&
                        ((r.evt.dir === 'x' && this.orientation === 'horizontal') ||
                         (r.evt.dir === 'y' && this.orientation === 'vertical'))),
                map(r => r!.evt.amount),
                scan(
                    (acc, val) => {
                      if (acc === 0) {
                        return val;
                      }
                      if (acc / Math.abs(acc) !== val / Math.abs(val)) {
                        return 0;
                      }
                      return acc + val;
                    },
                    0),
                filter(val => !this._animating && Math.abs(val) > 150),
                throttleTime(1500),
                )
            .subscribe(val => {
              this._mouseWheelEvt.emit({dir: 'x', amount: val > 0 ? -1 : +1});
              this.slide({dir: val > 0 ? 'back' : 'forward'});
            });
  }

  ngAfterContentInit(): void {
    this._onSlidesChange();
    this._pagesSub = this.pages.changes.subscribe(() => this._onSlidesChange());
  }

  ngOnDestroy(): void {
    this._pagesSub.unsubscribe();
    this._mouseWheelEvt.complete();
    this._mouseWheelSub.unsubscribe();
    this._orientationChange.complete();
  }

  switchOrientation(): void {
    if (this._orientation === 'horizontal') {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  slide(opts: AjfPageSliderSlideOptions): void {
    if (this.pages == null) {
      return;
    }
    if (opts.dir) {
      if (opts.dir === 'back' || opts.dir === 'up' || opts.dir === 'left') {
        this._slideBack();
      } else if (opts.dir === 'forward' || opts.dir === 'down' || opts.dir === 'right') {
        this._slideForward();
      }
    } else if (opts.to) {
      this._slideTo(opts.to);
    }
  }

  onMouseWheel(event: Event): void {
    const evt = event as WheelEvent;
    if (evt.deltaX == null || evt.deltaY == null) {
      return;
    }
    const absDeltaX = Math.abs(evt.deltaX);
    const absDeltaY = Math.abs(evt.deltaY);
    if (absDeltaX === 0 && absDeltaY === 0) {
      return;
    }
    if (absDeltaX > absDeltaY) {
      this._mouseWheelEvt.emit({dir: 'x', amount: -evt.deltaX});
    } else {
      this._mouseWheelEvt.emit({dir: 'y', amount: -evt.deltaY});
    }
  }

  onTouchStart(evt: TouchEvent): void {
    if (evt.touches == null || evt.touches.length === 0 || this._animating) {
      return;
    }
    this._currentOrigin = {x: evt.touches[0].clientX, y: evt.touches[0].clientY, time: +new Date()};
  }

  onTouchMove(evt: TouchEvent): void {
    if (evt.touches == null || evt.touches.length === 0 || this._currentOrigin == null ||
        this._animating) {
      return;
    }
    const point: Point = {x: evt.touches[0].clientX, y: evt.touches[0].clientY, time: +new Date()};
    const movement = this._calculateMovement(point);
    this._currentOrigin = point;

    if (movement.velocityX === 0 && movement.velocityY === 0) {
      return;
    }
    const absVelocityX = Math.abs(movement.velocityX);
    const absVelocityY = Math.abs(movement.velocityY);
    if (absVelocityX > absVelocityY) {
      if (this.orientation === 'horizontal' && absVelocityX > 1.5 &&
          Math.abs(movement.deltaX) > 50) {
        this._resetCurrentOrigin();
        this.slide({dir: movement.velocityX < 0 ? 'forward' : 'back'});
      } else {
        const page = this._getCurrentPage();
        if (page != null) {
          page.setScroll('x', movement.deltaX, movement.deltaTime);
        }
      }
    } else {
      if (this.orientation === 'vertical' && absVelocityY > 1.5 && Math.abs(movement.deltaY) > 50) {
        this._resetCurrentOrigin();
        this.slide({dir: movement.velocityY < 0 ? 'forward' : 'back'});
      } else {
        const page = this._getCurrentPage();
        if (page != null) {
          page.setScroll('y', movement.deltaY, movement.deltaTime);
        }
      }
    }
  }

  onTouchEnd(): void {
    this._resetCurrentOrigin();
  }

  isCurrentPageLong(): boolean {
    const curPage = this._getCurrentPage();
    if (curPage == null) {
      return false;
    }
    return curPage.wrapper.nativeElement.clientHeight > curPage.content.nativeElement.clientHeight;
  }

  private _resetCurrentOrigin(): void {
    this._currentOrigin = null;
  }

  private _getCurrentPage(): AjfPageSliderItem|null {
    if (this.pages == null || this.currentPage < 0 || this.currentPage >= this.pages.length) {
      return null;
    }
    return this.pages.toArray()[this.currentPage];
  }

  private _calculateMovement(point: Point): Movement {
    const deltaX = point.x - this._currentOrigin!.x;
    const deltaY = point.y - this._currentOrigin!.y;
    const deltaTime = point.time - this._currentOrigin!.time;
    return {
      velocityX: deltaX / deltaTime,
      deltaX,
      velocityY: deltaY / deltaTime,
      deltaY,
      deltaTime,
    };
  }

  private _slideBack(): void {
    if (this._currentPage <= 0) {
      return;
    }
    this.currentPage = this._currentPage - 1;
  }

  private _slideForward(): void {
    if (this._currentPage >= this.pages.length) {
      return;
    }
    this.currentPage = this._currentPage + 1;
  }

  private _slideTo(page: number): void {
    if (page >= 0 && page < this.pages.length) {
      this.currentPage = page;
    }
  }

  private _doSlide(immediate = false): void {
    if (this.body == null || this.pages == null || this._animating) {
      return;
    }
    this._animating = true;
    const animation = this._animationBuilder.build(
        animate(immediate ? 0 : this.duration, style({transform: this._getCurrentTranslation()})));

    const player = animation.create(this.body.nativeElement);
    player.onDone(() => {
      this._animating = false;
      this._pageScrollFinish.emit();
    });
    player.play();
  }

  private _getCurrentTranslation(): string {
    const slideSize = 100 / this.pages.length;
    const position = this._currentPage === -1 ? 0 : this._currentPage * slideSize;
    const translation = this._orientation === 'vertical' ? 'Y' : 'X';
    return `translate${translation}(-${position}%)`;
  }

  private _getProps(): {prop: string, removeProp: string} {
    if (this._orientation === 'vertical') {
      return {prop: 'height', removeProp: 'width'};
    }
    return {prop: 'width', removeProp: 'height'};
  }

  private _onSlidesChange(): void {
    this._updateSize();
  }

  private _updateSize(): void {
    if (this.body == null || this.pages == null) {
      return;
    }
    const {prop, removeProp} = this._getProps();
    this._renderer.setStyle(this.body.nativeElement, prop, `${this.pages.length * 100}%`);
    this._renderer.setStyle(this.body.nativeElement, removeProp, null);
    let curPage: number;
    if (this.pages.length === 0) {
      curPage = -1;
    } else if (this._currentPage === -1) {
      curPage = 0;
    } else if (this._currentPage >= this.pages.length) {
      curPage = this.pages.length - 1;
    } else {
      curPage = this._currentPage;
    }
    this._currentPage = curPage;
    this._restoreCurrentPage();
  }

  private _restoreCurrentPage(): void {
    this._doSlide(true);
  }
}
