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

import {
  AjfBaseFieldComponent, AjfFormRendererService, AjfTableFieldInstance
} from '@ajf/core/forms';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';

import {AjfWarningAlertService} from './warning-alert-service';

interface ExtFormControl extends FormControl {
  show?: boolean;
}

@Component({
  templateUrl: 'table-field.html',
  styleUrls: ['table-field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfTableFieldComponent extends AjfBaseFieldComponent<AjfTableFieldInstance> {
  constructor(
    cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService) {
    super(cdr, service, was);
  }

  goToNextCell(ev: Event, row: number, column: number): void {
    const rowLength = this.instance.controls[row][1].length;
    const currentCell = this.instance.controls[row][1][column] as ExtFormControl;
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

  goToCell(row: number, column: number): void {
    this._resetControls();
    this._showCell(row, column);
  }

  private _resetControls(): void {
    this.instance.controls.forEach(row => row[1].forEach(cell => {
      if (typeof cell !== 'string') {
        (cell as ExtFormControl).show = false;
      }
    }));
  }

  private _showCell(row: number, column: number): void {
    if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
      return;
    }
    const nextCell = this.instance.controls[row][1][column] as ExtFormControl;
    if (typeof nextCell !== 'string') {
      nextCell.show = true;
    }
  }

  static ngAcceptInputType_readonly: BooleanInput;
}
