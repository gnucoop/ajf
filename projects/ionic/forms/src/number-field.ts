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
  AJF_WARNING_ALERT_SERVICE,
  AjfFormRendererService,
  AjfInputFieldComponent as CoreComponent,
} from '@ajf/core/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {defer, Observable, Subscription} from 'rxjs';
import {filter, startWith, switchMap, withLatestFrom} from 'rxjs/operators';

import {AjfWarningAlertService} from './warning-alert-service';

@Component({
  templateUrl: 'number-field.html',
  styleUrls: ['number-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfNumberFieldComponent extends CoreComponent implements OnDestroy, OnInit {
  readonly value: Observable<number | null>;

  private _setValueEvt: EventEmitter<number | null> = new EventEmitter<number | null>();
  private _setValueSub: Subscription = Subscription.EMPTY;

  constructor(
    cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService,
  ) {
    super(cdr, service, was);
    this.type = 'number';

    this.value = defer(() =>
      this.control.pipe(
        filter(control => control != null),
        switchMap(control => control!.valueChanges.pipe(startWith(control!.value))),
      ),
    ) as Observable<number | null>;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._setValueEvt.complete();
    this._setValueSub.unsubscribe();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._setValueSub = this._setValueEvt
      .pipe(withLatestFrom(this.control))
      .subscribe(([value, ctrl]) => {
        if (ctrl == null) {
          return;
        }
        const control = ctrl as UntypedFormControl;
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
}
