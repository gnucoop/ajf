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

// import {AnimationBuilder, AnimationPlayer} from '@angular/animations';
import {
  ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';

import {AjfPageSliderItemScrollDirection} from './page-slider-item-scroll-direction';

@Component({
  moduleId: module.id,
  selector: 'ajf-page-slider-item',
  templateUrl: 'page-slider-item.html',
  styleUrls: ['page-slider-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfPageSliderItem {
  @ViewChild('wrapper') wrapper: ElementRef;

  private _scrollX = 0;
  private _scrollY = 0;
  // private _player: AnimationPlayer | null;

  constructor(
    private _el: ElementRef,
    // private _animationBuilder: AnimationBuilder,
    private _renderer: Renderer2,
  ) { }

  setScroll(dir: AjfPageSliderItemScrollDirection,  amount: number, _velocity: number): boolean {
    if (this._el == null || this.wrapper == null || amount === 0) { return false; }
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
    if (
      wrapperSize <= containerSize
      || (currentScroll === maxScroll && amount < 0)
      || (currentScroll === 0 && amount > 0)
    ) { return false; }
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
      wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`
    );
    return true;
    // this._animateScroll(duration);
  }

  // private _animateScroll(duration: number): void {
  //   const animation = this._animationBuilder.build(animate(
  //     duration,
  //     style({transform: `translate(${this._scrollX}px, ${this._scrollY}px)`})
  //   ));
  //   this._player = animation.create(this.wrapper.nativeElement);
  //   this._player.onDone(() => {
  //     if (this._player == null) { return null; }
  //     this._player.destroy();
  //     this._player = null;
  //   });
  //   this._player.play();
  // }
}
