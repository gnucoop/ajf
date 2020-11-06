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

import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererStyleFlags2
} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {AjfImageIcon} from './image-icon';
import {AjfImageType} from './image-type';

@Directive()
export abstract class AjfImage implements OnDestroy, OnInit {
  iconComponent: ElementRef;

  /**
   * if 0 take image by url
   * if 1 take image by icon
   * if 2 take image by class
   *
   */
  @Input()
  set type(type: AjfImageType|null) {
    this._imageType.next(type);
  }

  @Input()
  set imageUrl(imageUrl: string|null) {
    imageUrl = typeof imageUrl === 'string' ? imageUrl : '';
    this._url.next(
        imageUrl.startsWith('data:image/svg+xml;base64,') ?
            this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl) :
            imageUrl);
  }

  @Input()
  set icon(icon: AjfImageIcon|null) {
    this._iconObj.next(icon);
  }

  @Input()
  set flag(flag: string|null) {
    this._flagName.next(flag);
  }

  readonly imageTypes = AjfImageType;

  private _imageType = new BehaviorSubject<AjfImageType|null>(null);
  readonly imageType: Observable<AjfImageType|null> =
      this._imageType as Observable<AjfImageType|null>;

  private _url = new BehaviorSubject<string|SafeResourceUrl|null>(null);
  readonly url: Observable<string|SafeResourceUrl|null> =
      this._url as Observable<string|SafeResourceUrl|null>;

  private _iconObj = new BehaviorSubject<AjfImageIcon|null>(null);
  readonly iconObj: Observable<AjfImageIcon|null> = this._iconObj as Observable<AjfImageIcon|null>;

  private _flagName = new BehaviorSubject<string|null>(null);
  readonly flagName: Observable<string|null> = this._flagName as Observable<string|null>;

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
    if (icon == null) {
      return;
    }
    const styles = this._el.nativeElement.style;
    if (this.iconComponent == null || styles == null || styles.fontSize == null) {
      return;
    }
    const fontSize: string = styles.fontSize;
    if (fontSize.match(/^[0-9]+px$/) != null) {
      const el = this.iconComponent.nativeElement;
      this._renderer.setStyle(el, 'width', fontSize, RendererStyleFlags2.Important);
      this._renderer.setStyle(el, 'height', fontSize, RendererStyleFlags2.Important);
    }
  }
}
