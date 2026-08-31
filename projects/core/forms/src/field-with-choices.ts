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

import {ChangeDetectorRef} from '@angular/core';
import {AbstractControl} from '@angular/forms';

import {AjfBaseFieldComponent} from './base-field';
import {AjfFormRendererService} from './form-renderer';
import {AjfFieldWithChoicesInstance} from './interface/fields-instances/field-with-choices-instance';
import {AjfWarningAlertService} from './warning-alert-service';

/**
 * It rappresents the base componet for every ajf fields with choiches.
 *
 * @export
 * @abstract
 * @class AjfFieldWithChoicesComponent
 * @template T
 */
export abstract class AjfFieldWithChoicesComponent<T> extends AjfBaseFieldComponent<
  AjfFieldWithChoicesInstance<T>
> {
  private _searchThreshold: number = 6;

  /**
   * It represents the threshold below which the choices are displayed
   * in expanded mode.
   *
   * @readonly
   */
  get searchThreshold(): number {
    return this._searchThreshold;
  }

  constructor(
    cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    warningAlertService: AjfWarningAlertService,
    searchThreshold: number,
  ) {
    super(cdr, service, warningAlertService);
    if (searchThreshold != null) {
      this._searchThreshold = searchThreshold;
    }
  }

  /**
   * Whether the field holds a selection, which is what the clear action is
   * offered for. A multiple choice value is an array and a single choice value a
   * scalar, and an empty array is as empty as a null.
   */
  hasValue(ctrl: AbstractControl): boolean {
    const value = ctrl != null ? ctrl.value : null;
    if (value == null || value === '') {
      return false;
    }
    return Array.isArray(value) ? value.length > 0 : true;
  }

  /**
   * Reset the field to no selection. Neither presentation can do this on its own:
   * a radio cannot be unpicked, and clearing a multi-select one chip at a time is
   * tedious.
   */
  clearValue(ctrl: AbstractControl, event?: Event): void {
    if (event != null) {
      // Stop the click reaching a select trigger, which would open the panel.
      event.stopPropagation();
      event.preventDefault();
    }
    ctrl.setValue(null);
    ctrl.markAsDirty();
  }
}
