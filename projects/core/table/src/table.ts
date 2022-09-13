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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {DomSanitizer} from '@angular/platform-browser';
import {AjfTableCell} from './table-cell';

@Component({
  selector: 'ajf-table',
  templateUrl: 'table.html',
  styleUrls: ['table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfTable implements OnDestroy {
  /**
   * data to be shown in the table
   */
  private _data: AjfTableCell[][] = [];
  get data(): AjfTableCell[][] {
    return this._data;
  }
  @Input()
  set data(data: AjfTableCell[][]) {
    this._data = this._fixData(data);
    this._cdr.markForCheck();
  }

  /**
   * cellpadding for all rows, include header
   */
  private _cellpadding: string = '';
  get cellpadding(): string {
    return this._cellpadding;
  }
  @Input()
  set cellpadding(cellpadding: string) {
    this._cellpadding = cellpadding;
    this._cdr.markForCheck();
  }

  /**
   * Emit an event when sort arrows are selected
   */
  @Output()
  readonly sortSelected = new EventEmitter<Sort>();

  /**
   * Creates an instance of TableComponent.
   *
   *
   * @memberOf TableComponent
   */
  constructor(private _cdr: ChangeDetectorRef, private _domSanitizer: DomSanitizer) {}

  private _fixData(data: AjfTableCell[][]): AjfTableCell[][] {
    (data || []).forEach(elem => {
      (elem || []).forEach(subElem => {
        subElem.value = this._domSanitizer.sanitize(
          SecurityContext.HTML,
          this._domSanitizer.bypassSecurityTrustHtml(subElem.value),
        );
      });
    });
    return data;
  }

  /**
   * Sort visible data and emit an event to use for paginated table
   * @param sort
   * @returns
   */
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const sortedData = this._data.slice(1).sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this._compare(a[0], b[0], isAsc);
    });
    this._data = [this._data[0], ...sortedData];
    this.sortSelected.emit(sort);
  }

  private _compare(a: AjfTableCell, b: AjfTableCell, isAsc: boolean) {
    return (a.value < b.value ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy(): void {
    this.sortSelected.complete();
  }
}
