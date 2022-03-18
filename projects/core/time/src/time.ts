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

import {Directive, Input, OnDestroy} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {Subscription} from 'rxjs';

import {AjfTimeModel} from './time-model';

@Directive()
export abstract class AjfTime implements ControlValueAccessor, OnDestroy {
  @Input() readonly: boolean = false;

  get time(): AjfTimeModel {
    return this._value;
  }

  private _value: AjfTimeModel = new AjfTimeModel();
  get value(): string {
    return this._value.toString();
  }

  set value(value: string) {
    if (value !== this._value.toString()) {
      this._value.fromString(value);
      this._onChangeCallback(value);
    }
  }

  get hours(): number {
    return this._value.hours;
  }
  set hours(hours: number) {
    this._value.hours = hours;
    this._onChangeCallback(this._value.toString());
  }

  get minutes(): number {
    return this._value.minutes;
  }
  set minutes(minutes: number) {
    this._value.minutes = minutes;
    this._onChangeCallback(this._value.toString());
  }

  private _onChangeCallback: (_: any) => void = (_: any) => {};
  private _onTouchedCallback: () => void = () => {};
  private _valueChangeSub: Subscription = Subscription.EMPTY;

  constructor() {
    this._valueChangeSub = this._value.changed.subscribe((x: string) => {
      this._onChangeCallback(x);
    });
  }

  ngOnDestroy(): void {
    this._valueChangeSub.unsubscribe();
  }

  writeValue(value: string) {
    this._value.fromString(value);
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  focusHandler(): void {
    this._onTouchedCallback();
  }
}
