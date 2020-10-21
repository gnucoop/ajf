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
  AjfBaseFieldComponent,
  AjfFormRendererService,
  AjfFormulaFieldInstance
} from '@ajf/core/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IonInput} from '@ionic/angular';
import {InputChangeEventDetail} from '@ionic/core';
import {Observable, Subscription} from 'rxjs';
import {filter, map, startWith, switchMap} from 'rxjs/operators';

import {AjfWarningAlertService} from './warning-alert-service';

@Component({
  templateUrl: 'formula-field.html',
  styleUrls: ['formula-field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfFormulaFieldComponent extends
    AjfBaseFieldComponent<AjfFormulaFieldInstance> implements OnDestroy {
  @ViewChild(IonInput, {static: true}) input: IonInput;

  readonly value: Observable<any>;

  private _onChangeEvt = new EventEmitter<any>();
  private _onChangeSub = Subscription.EMPTY;

  constructor(
      cdr: ChangeDetectorRef, service: AjfFormRendererService,
      @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService) {
    super(cdr, service, was);

    const control$ = this.control.pipe(
                         filter(control => control != null),
                         ) as Observable<FormControl>;
    const controlValue$ = control$.pipe(
                              switchMap(
                                  control => this._onChangeEvt.pipe(
                                      map(value => ({control, value})),
                                      )),
                              ) as Observable<{control: FormControl, value: any}>;

    this._onChangeSub = controlValue$.subscribe(({control, value}) => {
      try {
        const v = parseFloat(value);
        value = v;
      } catch (e) {
      }
      control.setValue(value);
    });

    this.value = this.control.pipe(
        filter(control => control != null),
        switchMap(
            control => control!.valueChanges.pipe(
                startWith(control!.value),
                )),
    );
  }

  ngOnDestroy(): void {
    this._onChangeEvt.complete();
    this._onChangeSub.unsubscribe();
  }

  onChange(event: Event): void {
    const evt = event as CustomEvent<InputChangeEventDetail>;
    if (evt.detail == null) {
      return;
    }
    this._onChangeEvt.emit(evt.detail.value);
  }
}
