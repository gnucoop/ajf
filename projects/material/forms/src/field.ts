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
  AjfFieldComponentsMap,
  AjfFieldInstance,
  AjfFormField as CoreFormField,
} from '@ajf/core/forms';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import {AjfFieldService} from './field-service';

@Component({
  selector: 'ajf-field,ajf-form-field',
  templateUrl: 'field.html',
  styleUrls: ['field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfFormField extends CoreFormField {
  readonly componentsMap: AjfFieldComponentsMap;

  constructor(cdr: ChangeDetectorRef, fieldService: AjfFieldService) {
    super(cdr);
    this.componentsMap = fieldService.componentsMap;
  }

  tabEvent(evt: KeyboardEvent, instance: AjfFieldInstance) {
    if (evt.code != 'Tab') return;
    const isShiftKey: boolean = evt.shiftKey;
    const cardIdNext = 'field_entry_' + (isShiftKey ? instance.node.id - 1 : instance.node.id + 1);

    const targetElement = document.querySelector(`#${cardIdNext}`) as HTMLElement;

    if (targetElement == null || instance == null) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }

  static ngAcceptInputType_readonly: BooleanInput;
}
