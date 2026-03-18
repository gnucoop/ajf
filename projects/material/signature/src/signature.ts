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

import {AjfSignature} from '@ajf/core/signature';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

export const SIGNATURE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AjfSignatureComponent),
  multi: true,
};

/**
 * Ajf signature component.
 */
@Component({
  selector: 'ajf-signature',
  templateUrl: 'signature.html',
  styleUrls: ['signature.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SIGNATURE_CONTROL_VALUE_ACCESSOR],
})
export class AjfSignatureComponent extends AjfSignature implements OnDestroy, AfterViewInit {
  constructor(cdr: ChangeDetectorRef, renderer: Renderer2, private _sanitizer: DomSanitizer) {
    super(cdr, renderer);
  }

  ngAfterViewInit(): void {
    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement?.getContext('2d') ?? null;
  }

  /**
   * Clears the signature value and preview (keeps the old url to delete old signature from storage)
   */
  clear() {
    if (this.context != null && this.sigPadElement != null) {
      this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
      this.context.beginPath();
    }
    this.isDrawn = false;
    this.value = {
      name: 'signature.webp',
      type: 'image/webp',
      signature: true,
      size: undefined,
      content: undefined,
      url: this.value?.url ?? undefined,
      deleteUrl: true,
    };
  }

  /**
   * Accepts the new signature from the canvas and sets it as field value (keeps the old url to delete old signature from storage)
   */
  accept() {
    if (this.sigPadElement != null) {
      const signatureDataUrl = this.sigPadElement.toDataURL('image/webp', 0.5);

      const head = 'data:image/webp;base64,';
      const imgFileSize = Math.round(((signatureDataUrl.length - head.length) * 3) / 4);

      this.value = {
        name: 'signature.webp',
        type: 'image/webp',
        signature: true,
        size: imgFileSize,
        content: signatureDataUrl,
        url: this.value?.url ?? undefined,
        deleteUrl: false,
      };
    }
  }

  /**
   * Sanitizes signature image url
   */
  get safeImageSrc(): SafeUrl | string | null {
    if (!this.value) return null;
    if (!this.value.content && this.value.deleteUrl) return null;

    const rawUrl =
      this.value.content && this.value.content.length ? this.value.content : this.value.url;
    if (!rawUrl) return null;

    const sanitizedUrl = this._sanitizer.bypassSecurityTrustUrl(rawUrl);
    return sanitizedUrl;
  }

  ngOnDestroy(): void {
    return;
  }
}
