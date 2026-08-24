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

import {AjfFieldInstance, AjfFieldType} from '@ajf/core/forms';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {Subscription} from 'rxjs';

/**
 * One field of a slide, laid out as a row: type badge, label, control, and a
 * right-hand column carrying either the field description or its validation
 * error.
 *
 * Both the plain and the repeating slide branches of the renderer render through
 * this component, so the row layout is defined in exactly one place.
 */
@Component({
  selector: 'ajf-field-row',
  templateUrl: 'field-row.html',
  styleUrls: ['field-row.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfFieldRow implements OnDestroy {
  @Input()
  set instance(instance: AjfFieldInstance) {
    this._instance = instance;
    // Validity, visibility and the error list are mutated in place on the
    // instance, so the row has to be told to re-check itself the same way the
    // field components do.
    this._instanceSub.unsubscribe();
    this._instanceSub = instance
      ? instance.updatedEvt.subscribe(() => this._cdr.markForCheck())
      : Subscription.EMPTY;
  }
  get instance(): AjfFieldInstance {
    return this._instance;
  }
  private _instance!: AjfFieldInstance;
  private _instanceSub: Subscription = Subscription.EMPTY;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this._instanceSub.unsubscribe();
  }

  @Input()
  set readonly(readonly: boolean) {
    this._readonly = coerceBooleanProperty(readonly);
  }
  get readonly(): boolean {
    return this._readonly;
  }
  private _readonly = false;

  /**
   * Rows drop out on the host element rather than inside it, so that a hidden
   * field leaves no empty cell behind when rows are laid out in columns.
   *
   * A formula field with no label carries no information of its own -- it only
   * feeds other fields -- so it is kept out of the layout too.
   */
  @HostBinding('class.ajf-hidden-row')
  get hidden(): boolean {
    const node = this.instance?.node;
    if (node == null || this.instance.visible === false) {
      return true;
    }
    return node.fieldType === AjfFieldType.Formula && node.label === '';
  }

  /** Notes render their own block and never get a control border around it. */
  get isNote(): boolean {
    return this.instance?.node.fieldType === AjfFieldType.Empty;
  }

  get required(): boolean {
    return this.instance?.node.validation?.notEmpty != null;
  }

  static ngAcceptInputType_readonly: BooleanInput;
}
