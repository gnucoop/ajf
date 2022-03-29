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

import {ChangeDetectorRef, Directive, Inject, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {AjfBaseFieldComponent} from './base-field';
import {AjfFormRendererService} from './form-renderer';
import {AjfTableFieldInstance} from './interface/fields-instances/table-field-instance';
import {AJF_WARNING_ALERT_SERVICE, AjfWarningAlertService} from './warning-alert-service';

/**
 * This component manages the table field data.
 * It exposes methods for managing the display of controllers.
 *
 *
 * @export
 * @abstract
 * @class AjfTableFieldComponent
 */
@Directive()
export abstract class AjfTableFieldComponent
  extends AjfBaseFieldComponent<AjfTableFieldInstance>
  implements OnDestroy
{
  private _instanceChangeSub = Subscription.EMPTY;

  constructor(
    cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService,
  ) {
    super(cdr, service, was);
  }

  /**
   *  set the current cell show to false and set the next cell show to true.
   *
   * @param ev
   * @param row
   * @param column
   * @return {*}
   */
  goToNextCell(ev: Event, row: number, column: number): void {
    if (
      this.instance == null ||
      this.instance.controls.length < row ||
      (this.instance.controls.length >= row && this.instance.controls[row].length < 1) ||
      this.instance.controls[row][1].length < column
    ) {
      return;
    }
    const rowLength = this.instance.controls[row][1].length;
    const currentCell = this.instance.controls[row][1][column];
    if (column + 1 >= rowLength) {
      column = 0;
      if (row + 1 >= this.instance.controls.length) {
        row = 1;
      } else {
        row += 1;
      }
    } else {
      column += 1;
    }
    if (typeof currentCell !== 'string') {
      currentCell.show = false;
    }
    this._showCell(row, column);
    ev.preventDefault();
    ev.stopPropagation();
  }

  /**
   * It resets all control.show to false and sets the control.show
   * (identified by row and column) to true.
   *
   * @param row
   * @param column
   */
  goToCell(row: number, column: number): void {
    this._resetControls();
    this._showCell(row, column);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._instanceChangeSub.unsubscribe();
  }

  protected override _onInstanceChange(): void {
    this._instanceChangeSub.unsubscribe();
    if (this.instance == null) {
      this._instanceChangeSub = Subscription.EMPTY;
      return;
    }
    let sub: Subscription;
    this.instance.controls.forEach(ctrlss => {
      if (typeof ctrlss === 'string') {
        return;
      }
      if (Array.isArray(ctrlss)) {
        ctrlss.forEach(ctrls => {
          if (typeof ctrls === 'string') {
            return;
          }
          if (Array.isArray(ctrls)) {
            ctrls.forEach(ctrl => {
              if (typeof ctrl === 'string') {
                return;
              }
              const curSub = ctrl.control.valueChanges.subscribe(() =>
                this._changeDetectorRef.markForCheck(),
              );
              if (typeof sub === 'undefined') {
                sub = curSub;
              } else {
                sub.add(curSub);
              }
            });
          }
        });
      }
    });
  }

  /**
   * it sets all controls show to false.
   *
   * @private
   */
  private _resetControls(): void {
    if (this.instance == null) {
      return;
    }
    this.instance.controls.forEach(row =>
      row[1].forEach(cell => {
        if (typeof cell !== 'string') {
          cell.show = false;
        }
      }),
    );
  }

  /**
   * It sets the control.show (identified by row and column) to true.
   *
   * @private
   * @param row
   * @param column
   * @return {*}
   */
  private _showCell(row: number, column: number): void {
    if (
      this.instance == null ||
      row >= this.instance.controls.length ||
      column >= this.instance.controls[row][1].length
    ) {
      return;
    }
    const nextCell = this.instance.controls[row][1][column];
    if (typeof nextCell !== 'string') {
      nextCell.show = true;
    }
  }
}
