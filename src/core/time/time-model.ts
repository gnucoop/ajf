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

import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';

export class AjfTimeModel {
  private _changed: EventEmitter<string> = new EventEmitter<string>();
  readonly changed: Observable<string> = this._changed as Observable<string>;

  private _hours = 0;
  private _minutes = 0;

  get minutes() {
    return this._minutes;
  }
  set minutes(value: number) {
    if (value > -1 && value < 61) {
      this._minutes = value;
      this._changed.emit(this.toString());
    }
  }

  get hours() {
    return this._hours;
  }
  set hours(value: number) {
    if (value > -1 && value < 24) {
      this._hours = value;
      this._changed.emit(this.toString());
    }
  }

  toString() {
    let minutes = this.minutes.toString().length > 1 && this.minutes || `0${this.minutes}`;
    let hours = this.hours.toString().length > 1 && this.hours || `0${this.hours}`;
    return `${hours}:${minutes}`;
  }

  fromString(value: string) {
    try {
      let splitted = value.split(':');
      if (splitted.length == 2) {
        this.hours = parseInt(splitted[0]);
        this.minutes = parseInt(splitted[1]);
      }
    } catch (e) {
    }
  }
}
