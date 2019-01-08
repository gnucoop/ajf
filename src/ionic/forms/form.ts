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
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';

import {Observable, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';

import {AjfFormRenderer as AjfCoreFormRenderer, AjfFormRendererService} from '@ajf/core/forms';

import {Keyboard} from '@ionic-native/keyboard/ngx';

import {AjfPageSliderItem} from '@ajf/core/page-slider';
import {AjfFormField} from './field';
import {AjfFormPage} from './form-page';

declare const document: any;
declare const window: any;


@Component({
  moduleId: module.id,
  selector: 'ajf-form',
  templateUrl: 'form.html',
  styleUrls: ['form.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [
    'saveAction',
    'submitAction',
    'hasStartMessage',
    'hasEndMessage',
    'form',
    'formSchema',
    'permissions',
    'title',
    'showTopToolbar',
    'showBottomToolbar',
    'showNavigationButtons'
  ],
  outputs: [
    'formSave',
    'formAction'
  ],
  queries: {
    formSlider: new ViewChild('formSlider'),
    fields: new ViewChildren(AjfFormField)
  }
})
/**
 * This class will define an ajf form renderer
 * @implements : AfterViewInit
 * @implements : AfterViewInit
 */
export class AjfFormRenderer extends AjfCoreFormRenderer
    implements AfterViewChecked, AfterViewInit, OnDestroy {
  private _pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _pageScrollFinishObs: Observable<boolean> = this._pageScrollFinish.asObservable();
  @Output() get pageScrollFinish(): Observable<boolean> { return this._pageScrollFinishObs; }
  @ViewChildren(AjfFormPage, {read: ElementRef}) formPages: QueryList<ElementRef>;

  private _keyboardShowSub: Subscription = Subscription.EMPTY;
  private _keyboardHideSub: Subscription = Subscription.EMPTY;
  private _currentKeyboardScroll: [number, number] | null;

  constructor(
    rendererService: AjfFormRendererService,
    cdr: ChangeDetectorRef,
    private _keyboard: Keyboard
  ) {
    super(rendererService, cdr);
  }

  bubblePageScrollFinish(direction: boolean): void {
    this._pageScrollFinish.emit(direction);
  }

  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    this._keyboardShowSub = this._keyboard.onKeyboardShow()
      .pipe(delay(200))
      .subscribe(() => {
        if (
          typeof document === 'undefined' || document.activeElement == null ||
          this.formPages == null
        ) {
          return;
        }
        const pages = this.formPages.toArray();
        const pos = this.formSlider.currentPage;

        if (pos < 0 || pos >= pages.length) { return; }

        const page = pages[pos];
        const contHeight = window.innerHeight;
        const target = document.activeElement;
        const targetRect = target.getBoundingClientRect();

        const vpos = targetRect.top + targetRect.height + 80;
        if (vpos > contHeight) {
          const scrollBy = vpos - contHeight;
          page.nativeElement.scrollBy(0, scrollBy);
          this._currentKeyboardScroll = [pos, scrollBy];
        } else {
          this._currentKeyboardScroll = null;
        }
      });

    this._keyboardHideSub = this._keyboard.onKeyboardHide()
      .subscribe(() => {
        if (this.formPages == null || this._currentKeyboardScroll == null) { return; }

        const pages = this.formPages.toArray();
        const pos = this._currentKeyboardScroll[0];

        if (pos < 0 || pos >= pages.length) { return; }

        const page = pages[pos];
        const scrollBy = this._currentKeyboardScroll[1];
        page.nativeElement.scrollBy(0, -scrollBy);
        this._currentKeyboardScroll = null;
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._keyboardShowSub.unsubscribe();
    this._keyboardHideSub.unsubscribe();
  }
}
