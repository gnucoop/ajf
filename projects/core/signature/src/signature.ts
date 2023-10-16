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

import {ChangeDetectorRef, Directive, HostListener, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {SignatureType} from './signature-type';

@Directive()
export abstract class AjfSignature implements ControlValueAccessor {
  @ViewChild('sigPad') sigPad: any;
  sigPadElement: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  isDrawing = false;
  isDrawn = false;
  /**
   * implements the control form value.
   * represents the signature value.
   *
   * @memberof AjfSignature
   */
  private _signatureValue: SignatureType = null;
  get value(): SignatureType {
    return this._signatureValue;
  }
  set value(value: SignatureType) {
    if (this._signatureValue !== value) {
      this._signatureValue = value;
      this._cdr.detectChanges();
      this._onChangeCallback(value);
    }
  }

  private _onChangeCallback = (_: any) => {};
  private _onTouchedCallback = () => {};

  constructor(protected _cdr: ChangeDetectorRef, private _renderer: Renderer2) {}

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  onMouseUp(_e: Event) {
    this.isDrawing = false;
  }

  onMouseDown(e: Event) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    if (this.context != null && coords) {
      this.context.moveTo(coords.x, coords.y);
    }
  }

  onMouseMove(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      if (this.context != null && coords) {
        this.context.lineTo(coords.x, coords.y);
        this.context.stroke();
      }
      this.isDrawn = true;
    }
  }

  /** ControlValueAccessor implements */
  writeValue(value: SignatureType) {
    this._signatureValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCallback = fn;
  }

  private relativeCoords(event: any) {
    if (event.target != null) {
      const evtType: string = event.type;
      const bounds = event.target.getBoundingClientRect();
      const x =
        (evtType.includes('touch') ? event.touches[0].clientX : event.clientX) - bounds.left;
      const y = (evtType.includes('touch') ? event.touches[0].clientY : event.clientY) - bounds.top;
      return {x: x, y: y};
    }
    return null;
  }
}
