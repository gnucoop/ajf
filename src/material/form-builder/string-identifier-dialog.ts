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

import {AjfFormStringIdentifier} from '@ajf/core/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy,
  ViewEncapsulation} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

import {AjfFormBuilderService} from './form-builder-service';

@Component({
  selector: 'ajf-fb-string-identifier-dialog',
  templateUrl: 'string-identifier-dialog.html',
  styleUrls: ['./string-identifier-dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfFbStringIdentifierDialogComponent implements OnDestroy {
  readonly dataSource: MatTableDataSource<AjfFormStringIdentifier>
      = new MatTableDataSource<AjfFormStringIdentifier>();
  readonly displayedColumns = ['label', 'value', 'delete'];
  readonly fields$: Observable<string[]>;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private _stringIdentifierSub: Subscription = Subscription.EMPTY;

  constructor(private _service: AjfFormBuilderService, private _cdr: ChangeDetectorRef) {
    this._stringIdentifierSub = _service.stringIdentifier.subscribe(identifier => {
      this.dataSource.data = [...identifier];
    });
    this.fields$ = _service.flatFields.pipe(
      map(fields =>
        fields.sort((f1, f2) => f1.name.localeCompare(f2.name)).map(f => f.name)
          .filter(f => f.length > 0)),
      shareReplay(1),
    );
  }

  addRow(): void {
    this.dataSource.data = [...this.dataSource.data, {label: '', value: []}];
  }

  deleteRow(rowIdx: number): void {
    this.dataSource.data = [
      ...this.dataSource.data.slice(0, rowIdx),
      ...this.dataSource.data.slice(rowIdx + 1),
    ];
  }

  addValue(
    row: AjfFormStringIdentifier, evt: MatChipInputEvent, valueInput: HTMLInputElement
  ): void {
    if (evt.value.length === 0) { return; }
    row.value = [...row.value, evt.value];
    valueInput.value = '';
    this._cdr.markForCheck();
  }

  removeValue(row: AjfFormStringIdentifier, value: string): void {
    const idx = row.value.indexOf(value);
    if (idx > -1) {
      row.value = [
        ...row.value.slice(0, idx),
        ...row.value.slice(idx + 1),
      ];
      this._cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this._stringIdentifierSub.unsubscribe();
  }

  saveStringIdentifier(): void {
    this._service.saveStringIdentifier(this.dataSource.data);
  }

  selected(
    row: AjfFormStringIdentifier, evt: MatAutocompleteSelectedEvent
  ): void {
    row.value = [...row.value, evt.option.value];
    this._cdr.markForCheck();
  }
}
