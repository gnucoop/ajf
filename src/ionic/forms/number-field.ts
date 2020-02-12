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

import {AjfInputFieldComponent as CoreComponent, AjfFormRendererService} from '@ajf/core/forms';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {defer, Observable, Subscription} from 'rxjs';
import {filter, switchMap, startWith, withLatestFrom} from 'rxjs/operators';

import {AjfWarningAlertService} from './warning-alert-service';

@Component({
  templateUrl: 'number-field.html',
  styleUrls: ['number-field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfNumberFieldComponent extends CoreComponent implements OnDestroy, OnInit {
  readonly value: Observable<number | null>;

  private _setValueEvt: EventEmitter<number | null> = new EventEmitter<number | null>();
  private _setValueSub: Subscription = Subscription.EMPTY;

  constructor(
    cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService) {
    super(cdr, service, was);
    this.type = 'number';

    this.value = defer(() => this.control.pipe(
      filter(control => control != null),
      switchMap(control => control!.valueChanges.pipe(
        startWith(control!.value),
      )),
    ));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._setValueEvt.complete();
    this._setValueSub.unsubscribe();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this._setValueSub = this._setValueEvt.pipe(
      withLatestFrom(this.control),
    ).subscribe(([value, control]) => {
      if (control == null) { return; }
      control.setValue(value);
    });
  }

  setValue(value: any): void {
    try {
      value = parseFloat(`${value}`);
      if (isNaN(value)) {
        value = null;
      }
    } catch (e) {
      value = null;
    }
    this._setValueEvt.emit(value);
  }

  static ngAcceptInputType_readonly: BooleanInput;
}
