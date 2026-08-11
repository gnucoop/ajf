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

import {AjfField, AjfFormStringIdentifier} from '@ajf/core/forms';
import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, startWith} from 'rxjs/operators';

import {AjfFormBuilderService} from './form-builder-service';

@Component({
  selector: 'ajf-fb-string-identifier-dialog',
  templateUrl: 'string-identifier-dialog.html',
  styleUrls: ['./string-identifier-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfFbStringIdentifierDialogComponent implements OnDestroy {
  readonly fields$: Observable<AjfField[]>;
  readonly filteredFields$: Observable<AjfField[]>;
  readonly searchFilterCtrl = new FormControl<string>('', {nonNullable: true});
  selectedFieldNames: string[] = [];

  private _fields: AjfField[] = [];
  private _fieldsSub: Subscription = Subscription.EMPTY;
  private _stringIdentifierSub: Subscription = Subscription.EMPTY;

  constructor(private _service: AjfFormBuilderService) {
    this.fields$ = _service.flatFields.pipe(
      map(fields =>
        fields
          .filter(f => f.name.length > 0)
          .sort((f1, f2) => (f1.label || f1.name).localeCompare(f2.label || f2.name)),
      ),
      shareReplay(1),
    );
    this._fieldsSub = this.fields$.subscribe(fields => {
      this._fields = fields;
    });
    this._stringIdentifierSub = _service.stringIdentifier.subscribe(identifier => {
      this.selectedFieldNames = identifier
        .map(entry => entry.value[0])
        .filter((name): name is string => name != null);
    });
    this.filteredFields$ = this.searchFilterCtrl.valueChanges.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      startWith(''),
      map(search => {
        const fields = this._fields;
        if (!search) {
          return fields;
        }
        const lowerSearch = search.toLowerCase();
        return fields.filter(f => (f.label || f.name).toLowerCase().includes(lowerSearch));
      }),
    );
  }

  ngOnDestroy(): void {
    this._fieldsSub.unsubscribe();
    this._stringIdentifierSub.unsubscribe();
  }

  saveStringIdentifier(): void {
    const identifier: AjfFormStringIdentifier[] = this.selectedFieldNames
      .map(name => this._fields.find(f => f.name === name))
      .filter((f): f is AjfField => f != null)
      .map(f => ({label: f.label || f.name, value: [f.name]}));
    this._service.saveStringIdentifier(identifier);
  }
}
