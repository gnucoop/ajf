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

import {animate, AnimationBuilder, style} from '@angular/animations';
import {
  AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList, Renderer2
} from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {coerceBooleanProperty} from '@ajf/core/utils';

import {AjfPageSliderItem} from './page-slider-item';
import {AjfPageSliderSlideOptions} from './page-slider-slide-options';

export type AjfPageSliderOrientation = 'horizontal' | 'vertical';

export class AjfPageSlider implements AfterContentInit, OnDestroy {
  body: ElementRef;
  pages: QueryList<AjfPageSliderItem>;

  private _pageScrollFinish: EventEmitter<void> = new EventEmitter<void>();
  readonly pageScrollFinish: Observable<void> = this._pageScrollFinish.asObservable();

  duration = 300;

  private _orientation: AjfPageSliderOrientation = 'horizontal';
  get orientation(): AjfPageSliderOrientation { return this._orientation; }
  set orientation(orientation: AjfPageSliderOrientation) {
    if (this._orientation !== orientation) {
      this._orientation = orientation;
      this._cdr.markForCheck();
      this._updateSize();
      this._restoreCurrentPage();
      this._restoreGestures();
    }
  }

  private _currentPage = -1;
  get currentPage(): number { return this._currentPage; }
  set currentPage(currentPage: number) {
    if (this.pages == null || currentPage < 0 || currentPage >= this.pages.length) { return; }
    this._currentPage = currentPage;
    this._doSlide();
  }

  private _hideNavigationButtons: boolean;
  get hideNavigationButtons(): boolean { return this._hideNavigationButtons; }
  set hideNavigationButtons(hnb: boolean) {
    this._hideNavigationButtons = coerceBooleanProperty(hnb);
    this._cdr.markForCheck();
  }

  private _animating = false;
  protected get animating(): boolean { return this._animating; }
  private _pagesSub: Subscription = Subscription.EMPTY;

  constructor(
    private _animationBuilder: AnimationBuilder,
    private _cdr: ChangeDetectorRef,
    private _renderer: Renderer2
  ) { }

  ngAfterContentInit(): void {
    this._onSlidesChange();
    this._pagesSub = this.pages.changes.subscribe(() => this._onSlidesChange());
  }

  ngOnDestroy(): void {
    this._pagesSub.unsubscribe();
  }

  slide(opts: AjfPageSliderSlideOptions): void {
    if (this.pages == null) { return; }
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

  protected _restoreGestures(): void { }

  private _slideBack(): void {
    if (this._currentPage <= 0) { return; }
    this.currentPage = this._currentPage - 1;
  }

  private _slideForward(): void {
    if (this._currentPage >= this.pages.length) { return; }
    this.currentPage = this._currentPage + 1;
  }

  private _slideTo(page: number): void {
    if (page >= 0 && page < this.pages.length) {
      this.currentPage = page;
    }
  }

  private _doSlide(): void {
    if (this.body == null || this.pages == null || this._animating) { return; }
    this._animating = true;
    const animation = this._animationBuilder.build(animate(
      this.duration,
      style({transform: this._getCurrentTranslation()})
    ));

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
    if (this.body == null || this.pages == null) { return; }
    const {prop, removeProp} = this._getProps();
    this._renderer.setStyle(this.body.nativeElement, prop, `${this.pages.length * 100}%`);
    this._renderer.setStyle(this.body.nativeElement, removeProp, null);
    if (this.pages.length === 0) {
      this.currentPage = -1;
    } else if (this._currentPage === -1) {
      this.currentPage = 0;
    } else if (this._currentPage >= this.pages.length) {
      this.currentPage = this.pages.length - 1;
    } else {
      this.currentPage = this._currentPage;
    }
  }

  private _restoreCurrentPage(): void {
    if (this.body == null || this.pages == null) { return; }
    this._renderer.setStyle(this.body.nativeElement, 'transform', this._getCurrentTranslation());
  }
}
