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
  ChangeDetectionStrategy, Component, forwardRef,
  ViewEncapsulation, Input
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {AjfTimeModel} from './time-model';

export const AJF_TIME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AjfTime),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'ajf-time',
  templateUrl: 'time.html',
  styleUrls: ['time.css'],
  providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfTime implements ControlValueAccessor {
  @Input() readonly: boolean;

  private _value: AjfTimeModel = new AjfTimeModel();
  get time(): AjfTimeModel {
    return this._value;
  }

  get value(): string {
    return this._value.toString();
  }

  set value(value: string) {
    if (value !== this._value.toString()) {
        this._value.fromString(value);
        this._onChangeCallback(value);
    }
  }

  get hours(): number { return this._value.hours; }
  set hours(hours: number) {
    this._value.hours = hours;
    this._onChangeCallback(this._value);
  }

  get minutes(): number { return this._value.minutes; }
  set minutes(minutes: number) {
    this._value.minutes = minutes;
    this._onChangeCallback(this._value);
  }

  private _onChangeCallback: (_: any) => void = (_: any) => {};
  private _onTouchedCallback: () => void = () => {};

  constructor() {
    this._value.changed
      .subscribe((x: string) => {
        this._onChangeCallback(x);
      });
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
