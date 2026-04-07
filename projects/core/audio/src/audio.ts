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

import {ChangeDetectorRef, Directive, EventEmitter, Output} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

@Directive()
export abstract class AjfAudio implements ControlValueAccessor {
  @Output() valueChange = new EventEmitter<string | null>();

  private _value: string | null = null;
  get value(): string | null {
    return this._value;
  }
  set value(val: string | null) {
    if (this._value !== val) {
      this._value = val;
      this._cdr.markForCheck();
      this._onChangeCallback(val);
      this.valueChange.emit(val);
    }
  }

  private _onChangeCallback = (_: any) => {};
  private _onTouchedCallback = () => {};

  constructor(protected _cdr: ChangeDetectorRef) {}

  writeValue(value: string | null): void {
    this._value = value;
    this._cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }
}
