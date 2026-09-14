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

import {ChangeDetectorRef, Directive, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {defer, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {AjfFormRendererService} from './form-renderer';
import {AjfFieldInstance} from './interface/fields-instances/field-instance';
import {AjfWarningAlertService} from './warning-alert-service';

/**
 * It rappresents the base field component, the first overlay of ajfFieldInstance.
 * It keeps a reference to the relative control of the form.
 * It manages the component update in conjunction with the instance update.
 * @export
 * @abstract
 * @class AjfBaseFieldComponent
 * @template T
 */
@Directive()
export abstract class AjfBaseFieldComponent<T extends AjfFieldInstance = AjfFieldInstance>
  implements OnDestroy, OnInit
{
  private _instance: T | undefined;
  get instance(): T | undefined {
    return this._instance;
  }
  set instance(instance: T | undefined) {
    if (instance !== this._instance) {
      this._instance = instance;
      this._setUpInstanceUpdate();
      this._onInstanceChange();
    }
  }

  private _control: Observable<UntypedFormControl | null>;
  get control(): Observable<UntypedFormControl | null> {
    return this._control;
  }

  private _warningTriggerSub: Subscription = Subscription.EMPTY;
  private _instanceUpdateSub: Subscription = Subscription.EMPTY;

  constructor(
    protected _changeDetectorRef: ChangeDetectorRef,
    private _service: AjfFormRendererService,
    private _warningAlertService: AjfWarningAlertService,
  ) {
    this._control = defer(() =>
      this._service
        .getControl(this.instance)
        .pipe(map(ctrl => (ctrl || new UntypedFormControl()) as UntypedFormControl)),
    ) as Observable<UntypedFormControl | null>;
  }

  // Nothing left to set up: the warning machinery is untouched -- the renderer
  // still evaluates every warning group and `instance.warningTrigger` still
  // fires with `instance.warningResults` filled in -- but the confirmation
  // dialog it used to open is gone, so nothing subscribes to the trigger any
  // more. The hook itself stays, empty, because subclasses call
  // `super.ngOnInit()` -- field components in host applications included, so
  // dropping it would break them at compile time.
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._warningTriggerSub.unsubscribe();
    this._instanceUpdateSub.unsubscribe();
  }
  // TODO: why?
  protected _onInstanceChange(): void {}

  private _setUpInstanceUpdate(): void {
    this._instanceUpdateSub.unsubscribe();
    if (this._instance != null) {
      this._instanceUpdateSub = this._instance.updatedEvt.subscribe(() => {
        if (this._changeDetectorRef) {
          try {
            this._changeDetectorRef.detectChanges();
          } catch (e) {
            if (isDevMode()) {
              console.log(e);
            }
          }
        }
      });
    } else {
      this._instanceUpdateSub = Subscription.EMPTY;
    }
    this._changeDetectorRef.detectChanges();
  }
}
