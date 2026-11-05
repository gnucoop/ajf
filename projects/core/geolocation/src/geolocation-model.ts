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

import {EventEmitter, isDevMode} from '@angular/core';
import {Observable} from 'rxjs';

export class AjfGeolocationModel {
  private _changed: EventEmitter<string> = new EventEmitter<string>();
  readonly changed: Observable<string> = this._changed as Observable<string>;

  private _latitude = '';
  private _longitude = '';

  get longitude() {
    return this._longitude;
  }
  set longitude(value: string) {
    this._longitude = normalizeCoordinate(value);
    this._changed.emit(this.toString());
  }

  get latitude() {
    return this._latitude;
  }
  set latitude(value: string) {
    this._latitude = normalizeCoordinate(value);
    this._changed.emit(this.toString());
  }

  /** True when neither coordinate is set, as for a field never filled in or cleared by hand. */
  get empty(): boolean {
    return this._latitude === '' && this._longitude === '';
  }

  toString() {
    return `${this.latitude},${this.longitude}`;
  }

  fromString(value: string | null) {
    if (value == null || value === '') {
      this.latitude = '';
      this.longitude = '';
      return;
    }
    try {
      let splitted = value.toString().split(',');
      if (splitted.length == 2) {
        this.latitude = splitted[0];
        this.longitude = splitted[1];
      }
    } catch (e) {
      if (isDevMode()) {
        console.log(e);
      }
    }
  }
}

/** A coordinate as typed, with a decimal comma read as a point; empty when cleared. */
function normalizeCoordinate(value: string | number | null | undefined): string {
  return value == null ? '' : value.toString().replace(',', '.');
}
