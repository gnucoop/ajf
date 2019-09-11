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

import {ElementRef, OnDestroy, OnInit, Renderer2, RendererStyleFlags2} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import {Observable, BehaviorSubject, Subscription} from 'rxjs';

import {AjfImageIcon} from './image-icon';
import {AjfImageType} from './image-type';

export abstract class AjfImage implements OnDestroy, OnInit {
  iconComponent: ElementRef;

  /**
   * if 0 take image by url
   * if 1 take image by icon
   * if 2 take image by class
   *
   */
  set type(type: AjfImageType) {
    this._imageType.next(type);
  }

  set imageUrl(imageUrl: string) {
    this._url.next(
      (imageUrl || '').startsWith('data:image/svg+xml;base64,')
      ? this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl)
      : imageUrl
    );
  }

  set icon(icon: AjfImageIcon) {
    this._iconObj.next(icon);
  }

  set flag(flag: string) {
    this._flagName.next(flag);
  }

  readonly imageTypes = AjfImageType;

  private _imageType = new BehaviorSubject<AjfImageType | null>(null);
  readonly imageType: Observable<AjfImageType | null> = this._imageType.asObservable();

  private _url = new BehaviorSubject<string | SafeResourceUrl | null>(null);
  readonly url: Observable<string | SafeResourceUrl | null> = this._url.asObservable();

  private _iconObj = new BehaviorSubject<AjfImageIcon | null>(null);
  readonly iconObj: Observable<AjfImageIcon | null> = this._iconObj.asObservable();

  private _flagName = new BehaviorSubject<string | null>(null);
  readonly flagName: Observable<string | null> = this._flagName.asObservable();

  private _iconSub = Subscription.EMPTY;

  constructor(
      private _el: ElementRef, private _renderer: Renderer2, private _domSanitizer: DomSanitizer) {
    this._iconSub = this.iconObj.subscribe(() => this._updateIconSize());
  }

  ngOnDestroy(): void {
    if (this._iconSub && !this._iconSub.closed) {
      this._iconSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._updateIconSize();
  }

  private _updateIconSize(): void {
    const icon = this._iconObj.getValue();
    if (icon == null) { return; }
    const styles = this._el.nativeElement.style;
    if (this.iconComponent == null || styles == null || styles.fontSize == null) { return; }
    const fontSize: string = styles.fontSize;
    if (fontSize.match(/^[0-9]+px$/) != null) {
      const el = this.iconComponent.nativeElement;
      this._renderer.setStyle(el, 'width', fontSize, RendererStyleFlags2.Important);
      this._renderer.setStyle(el, 'height', fontSize, RendererStyleFlags2.Important);
    }
  }
}
