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

import {ChangeDetectorRef, Directive, Input, OnDestroy} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {Subscription} from 'rxjs';

import {AjfGeolocationModel} from './geolocation-model';

@Directive()
export abstract class AjfGeolocation implements ControlValueAccessor, OnDestroy {
  @Input() readonly: boolean = false;

  get geolocation(): AjfGeolocationModel {
    return this._value;
  }

  private _value: AjfGeolocationModel = new AjfGeolocationModel();
  get value(): string {
    return this._value.toString();
  }

  set value(value: string) {
    if (value !== this._value.toString()) {
      this._value.fromString(value);
      this._onChangeCallback(value);
    }
  }

  get latitude(): string {
    return this._value.latitude;
  }
  set latitude(latitude: string) {
    this._value.latitude = latitude;
    this._cdr.detectChanges();
    this._onChangeCallback(this._value.toString());
  }

  get longitude(): string {
    return this._value.longitude;
  }
  set longitude(longitude: string) {
    this._value.longitude = longitude;
    this._cdr.detectChanges();
    this._onChangeCallback(this._value.toString());
  }

  private _onChangeCallback: (_: any) => void = (_: any) => {};
  private _onTouchedCallback: () => void = () => {};
  private _valueChangeSub: Subscription = Subscription.EMPTY;

  constructor(protected _cdr: ChangeDetectorRef) {
    this._valueChangeSub = this._value.changed.subscribe((x: string) => {
      this._onChangeCallback(x);
    });
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          }
        },
        error => console.log(error),
      );
    } else {
      console.log('Geolocation is not supported by this device or browser.');
    }
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
