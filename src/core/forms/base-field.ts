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

import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {filter, map, withLatestFrom} from 'rxjs/operators';

import {AjfFieldWarningAlertResult} from './field-warning-alert-result';
import {AjfFormRendererService} from './form-renderer';
import {AjfFieldInstance} from './interface/fields-instances/field-instance';
import {AjfWarningAlertService} from './warning-alert-service';

export abstract class AjfBaseFieldComponent<T extends AjfFieldInstance = AjfFieldInstance>
    implements OnDestroy, OnInit {
  private _instance: T;
  get instance(): T { return this._instance; }
  set instance(instance: T) {
    if (instance !== this._instance) {
      this._instance = instance;
      this._setUpInstanceUpdate();
    }
  }

  private _control: Observable<AbstractControl | null>;
  get control(): Observable<AbstractControl | null> { return this._control; }

  private _warningTriggerSub: Subscription = Subscription.EMPTY;
  private _instanceUpdateSub: Subscription = Subscription.EMPTY;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _service: AjfFormRendererService,
    private _warningAlertService: AjfWarningAlertService,
  ) { }

  ngOnInit(): void {
    this._control = this._service.getControl(this.instance).pipe(
      map(ctrl => ctrl || new FormControl()),
    );
    this._warningTriggerSub = this.instance.warningTrigger.pipe(
      withLatestFrom(this.control),
      filter(v => v[1] != null)
    ).subscribe((v: [void, AbstractControl | null]) => {
      if (this.instance.warningResults == null) { return; }
      const control = v[1];
      const s = this._warningAlertService.showWarningAlertPrompt(
        this.instance.warningResults.filter(w => w.result).map(w => w.warning)
      ).subscribe(
        (r: AjfFieldWarningAlertResult) => {
          if (r.result) { control!.setValue(null); }
        },
        (_e: any) => { if (s) { s.unsubscribe(); }},
        () => { if (s) { s.unsubscribe(); }}
      );
    });
  }

  ngOnDestroy(): void {
    this._warningTriggerSub.unsubscribe();
    this._instanceUpdateSub.unsubscribe();
  }

  private _setUpInstanceUpdate(): void {
    this._instanceUpdateSub.unsubscribe();
    if (this._instance != null) {
      this._instanceUpdateSub = this._instance.updated.subscribe(() => {
        if (this._changeDetectorRef) {
          try {
            this._changeDetectorRef.detectChanges();
          } catch (e) { }
        }
      });
    } else {
      this._instanceUpdateSub = Subscription.EMPTY;
    }
  }
}
