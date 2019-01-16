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

export class AjfPageSlider implements AfterContentInit, OnDestroy {
  body: ElementRef;
  pages: QueryList<AjfPageSliderItem>;

  private _pageScrollFinish: EventEmitter<void> = new EventEmitter<void>();
  readonly pageScrollFinish: Observable<void> = this._pageScrollFinish.asObservable();

  duration = 300;

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
      if (opts.dir === 'up') {
        this._slideUp();
      } else {
        this._slideDown();
      }
    } else if (opts.to) {
      this._slideTo(opts.to);
    }
  }

  private _slideUp(): void {
    if (this._currentPage <= 0) { return; }
    this.currentPage = this._currentPage - 1;
  }

  private _slideDown(): void {
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
    const slideSize = 100 / this.pages.length;
    const position = this._currentPage === -1 ? 0 : this._currentPage * slideSize;
    const animation = this._animationBuilder.build(animate(
      this.duration,
      style({transform: `translateY(-${position}%)`})
    ));

    const player = animation.create(this.body.nativeElement);
    player.onDone(() => {
      this._animating = false;
      this._pageScrollFinish.emit();
    });
    player.play();
  }

  private _onSlidesChange(): void {
    this._updateHeight();
  }

  private _updateHeight(): void {
    if (this.body == null || this.pages == null) { return; }
    this._renderer.setStyle(this.body.nativeElement, 'height', `${this.pages.length * 100}%`);
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
}
