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

import {AfterViewInit, ChangeDetectorRef, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {filter, withLatestFrom} from 'rxjs/operators';

import {AjfFormRendererService} from './form-renderer';
import {AjfDateFieldInstance} from './interface/fields-instances/date-field-instance';
import {AjfEmptyFieldInstance} from './interface/fields-instances/empty-field-instance';
import {AjfFieldInstance} from './interface/fields-instances/field-instance';
import {
  AjfFieldWithChoicesInstance
} from './interface/fields-instances/field-with-choices-instance';
import {AjfTableFieldInstance} from './interface/fields-instances/table-field-instance';
import {AjfFieldType} from './interface/fields/field-type';
import {AjfFieldWithChoices} from './interface/fields/field-with-choices';
import {isFieldWithChoicesInstance} from './utils/fields-instances/is-field-with-choices-instance';

export interface AjfFormFieldWarningAlertResult { result: boolean; }

export class AjfFormFieldValueChanged { field: AjfFormField; }


export abstract class AjfFormField implements AfterViewInit, OnDestroy, OnInit {
  // AjfFieldType obj implement the type of field
  // ( String, Text, Number, Boolean, SingleChoice, MultipleChoice,
  // Formula, Empty, Composed )
  ajfFieldTypes = AjfFieldType;
  // this observable implement abstract control
  control: Observable<AbstractControl | null>;

  private _fieldInstance: AjfFieldInstance;
  get fieldInstance(): AjfFieldInstance { return this._fieldInstance; }
  set fieldInstance(fieldInstance: AjfFieldInstance) {
    this._fieldInstance = fieldInstance;
    this._fieldUpdateSubscription.unsubscribe();
    this._fieldUpdateSubscription = fieldInstance.updated.subscribe(() => {
      if (this._changeDetectionRef) {
        try {
          this._changeDetectionRef.detectChanges();
        } catch (e) { }
      }
    });
  }

  get fwcInst(): AjfFieldWithChoicesInstance<any> {
    return this._fieldInstance as AjfFieldWithChoicesInstance<any>;
  }
  get fwc(): AjfFieldWithChoices<any> {
    return this._fieldInstance.node as AjfFieldWithChoices<any>;
  }
  get datefInst(): AjfDateFieldInstance { return this._fieldInstance as AjfDateFieldInstance; }
  get tablefInst(): AjfTableFieldInstance { return this._fieldInstance  as AjfTableFieldInstance; }
  get emptyfInst(): AjfEmptyFieldInstance { return this._fieldInstance as AjfEmptyFieldInstance; }

  singleChoiceSelect: any;
  multipleChoiceSelect: any;

  // this private AjfFieldValueChanged event emitter emit an event when the
  // field value is changed
  private _valueChanged: EventEmitter<AjfFormFieldValueChanged> =
      new EventEmitter<AjfFormFieldValueChanged>();
  // this @output expose the value changed like an observable
  get valueChanged(): Observable<AjfFormFieldValueChanged> {
    return this._valueChanged.asObservable();
  }

  private _triggerSelectionSubscription: Subscription = Subscription.EMPTY;
  private _triggerWarningSubscription: Subscription = Subscription.EMPTY;
  private _fieldUpdateSubscription: Subscription = Subscription.EMPTY;

  /**
   * this constructor will init _rendererService _changeDetectionRef _alertCtrl
   * and init the messagesWarning subscription
   */
  constructor(protected _rendererService: AjfFormRendererService,
              protected _changeDetectionRef: ChangeDetectorRef) {}

  abstract showWarningAlertPrompt(
    messagesWarning: string[]
  ): Observable<AjfFormFieldWarningAlertResult>;

  /**
   * this method will init the control, the filtere choices and the change
   * detection reference
   */
  ngOnInit(): void {
    this.control = this._rendererService.getControl(this.fieldInstance);
    this._triggerWarningSubscription =
        this.fieldInstance.warningTrigger
            .pipe(withLatestFrom(this.control), filter(v => v[1] != null))
            .subscribe((v: [void, AbstractControl|null]) => {
              const control = v[1];
              const s = this.showWarningAlertPrompt((this.fieldInstance.warningResults || [])
                                                        .filter(w => w.result)
                                                        .map(w => w.warning))
                            .subscribe(
                                (r: AjfFormFieldWarningAlertResult) => {
                                  if (r.result) {
                                    control!.setValue(null);
                                  }
                                },
                                (_e: any) => {
                                  if (s) {
                                    s.unsubscribe();
                                  }
                                },
                                () => {
                                  if (s) {
                                    s.unsubscribe();
                                  }
                                });
            });
  }

  ngAfterViewInit() {
    if (isFieldWithChoicesInstance(this.fieldInstance)) {
      this._triggerSelectionSubscription = this.fwcInst.selectionTrigger.subscribe(() => {
        this._triggerSelection();
      });
    }
  }

  ngOnDestroy(): void {
    this._triggerSelectionSubscription.unsubscribe();
    this._triggerWarningSubscription.unsubscribe();
    this._fieldUpdateSubscription.unsubscribe();
  }

  private _triggerSelection(): void {
    if (this.singleChoiceSelect != null && !this.singleChoiceSelect._isOpen) {
      this.singleChoiceSelect.open();
    } else if (this.multipleChoiceSelect != null &&
               !this.multipleChoiceSelect._isOpen) {
      this.multipleChoiceSelect.open();
    }
  }
}
