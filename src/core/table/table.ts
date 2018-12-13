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
  Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, ViewEncapsulation
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {AjfTableCell} from './table-cell';

@Component({
  moduleId: module.id,
  selector: 'ajf-table',
  templateUrl: 'table.html',
  styleUrls: ['table.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AjfTable {
  private _data: AjfTableCell[][];
  get data(): AjfTableCell[][] { return this._data; }
  @Input() set data(data: AjfTableCell[][]) {
    this._data = this._fixData(data);
    this._cdr.markForCheck();
  }

  private _cellpadding: string;
  get cellpadding(): string { return this._cellpadding; }
  @Input() set cellpadding(cellpadding: string) {
    this._cellpadding = cellpadding;
    this._cdr.markForCheck();
  }

  /**
   * Creates an instance of TableComponent.
   *
   *
   * @memberOf TableComponent
   */
  constructor(private _cdr: ChangeDetectorRef, private _domSanitizer: DomSanitizer) { }

  private _fixData(data: AjfTableCell[][]): AjfTableCell[][] {
    (data || []).forEach((elem) => {
      (elem || []).forEach((subElem) => {
        subElem.value = this._domSanitizer.bypassSecurityTrustHtml(subElem.value);
      });
    });
    return data;
  }
}
