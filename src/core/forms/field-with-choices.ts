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

import {AjfBaseFieldComponent} from './base-field';
import {AjfFormRendererService} from './form-renderer';
import {
  AjfFieldWithChoicesInstance
} from './interface/fields-instances/field-with-choices-instance';
import {AjfWarningAlertService} from './warning-alert-service';

/**
 * It rappresents the base componet for every ajf fields with choiches.
 *
 * @export
 * @abstract
 * @class AjfFieldWithChoicesComponent
 * @template T
 */
export abstract class AjfFieldWithChoicesComponent<T> extends
    AjfBaseFieldComponent<AjfFieldWithChoicesInstance<T>> {
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
      cdr: ChangeDetectorRef, service: AjfFormRendererService,
      warningAlertService: AjfWarningAlertService, searchThreshold: number) {
    super(cdr, service, warningAlertService);
    if (searchThreshold != null) {
      this._searchThreshold = searchThreshold;
    }
  }
}
