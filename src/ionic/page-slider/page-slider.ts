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

import {AnimationBuilder} from '@angular/animations';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren,
  ElementRef, EventEmitter, NgZone, OnDestroy, Renderer2, ViewChild, ViewEncapsulation
} from '@angular/core';

import {Subscription} from 'rxjs';
import {filter, throttleTime} from 'rxjs/operators';

import {AjfPageSlider as AjfCorePageSlider, AjfPageSliderItem} from '@ajf/core/page-slider';

@Component({
  moduleId: module.id,
  selector: 'ajf-page-slider',
  templateUrl: 'page-slider.html',
  styleUrls: ['page-slider.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['duration', 'currentPage', 'hideNavigationButtons'],
  outputs: ['pageScrollFinish'],
  queries: {
    pages: new ContentChildren(AjfPageSliderItem),
    body: new ViewChild('body'),
    content: new ViewChild('content')
  },
})
export class AjfPageSlider extends AjfCorePageSlider implements AfterViewInit, OnDestroy {
  content: ElementRef;

  private _hammerManager: any;
  private _panRecognizer: any;
  private _panEvt: EventEmitter<any> = new EventEmitter<any>();
  private _panSub: Subscription = Subscription.EMPTY;

  constructor(
    animationBuilder: AnimationBuilder,
    cdr: ChangeDetectorRef,
    renderer: Renderer2,
    private _zone: NgZone,
  ) {
    super(animationBuilder, cdr, renderer);
  }

  ngAfterViewInit(): void {
    if (this.content == null) { return; }
    const hammerLib = this._checkHasHammer();
    if (hammerLib != null) {
      this._hammerManager = this._zone.run(_ => {
        const el = this.content.nativeElement;
        const manager = new hammerLib.Manager(el, {
          touchAction: 'pan',
        });

        this._panRecognizer = new hammerLib.Pan({direction: hammerLib.DIRECTION_VERTICAL});
        manager.add(this._panRecognizer);

        manager.on('pan', (evt: any) => this._onPan(evt));

        return manager;
      });

      this._panSub = this._panEvt.pipe(
        filter(evt => {
          if (evt.isFinal && evt.velocityY != null) {
            const absVelocity = Math.abs(evt.velocityY);
            if (absVelocity > 0.25) {
              return true;
            }
          }
          return false;
        }),
        throttleTime(500),
      ).subscribe(evt => {
        const dir = evt.velocityY < 0 ? 'down' : 'up';
        this._panRecognizer.reset();
        this.slide({dir});
        evt.preventDefault();
        if (evt.srcEvent && evt.srcEvent.stopPropagation) {
          evt.srcEvent.stopPropagation();
        }
      });
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this._hammerManager) { this._hammerManager.destroy(); }
    this._panEvt.complete();
    this._panSub.unsubscribe();
  }

  private _onPan(evt: any): void {
    this._panEvt.emit(evt);
  }

  private _checkHasHammer(): any {
    const hammer = typeof window !== 'undefined' ? (window as any).Hammer : null;
    if (hammer == null) { this._printHammerError(); }
    return hammer;
  }

  private _printHammerError(): any {
    const winConsole = typeof window !== 'undefined' ? (window as any).console : null;
    if (winConsole != null) {
      winConsole.warn('HammerJS not included, Plage Slider won\'t work as expected!');
    }
  }
}
