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

import {ChangeDetectionStrategy, Component, Optional, ViewEncapsulation} from '@angular/core';

import {
  AjfCheckboxGroup, AjfCheckboxGroupItem as AjfCoreCheckboxGroupItem
} from '@ajf/core/checkbox-group';


@Component({
  moduleId: module.id,
  selector: 'ajf-checkbox-group-item',
  templateUrl: 'checkbox-group-item.html',
  styleUrls: ['checkbox-group-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.id]': 'id',
    '[class.ajf-checkbox-group-checked]': 'checked',
    '[class.ajf-checkbox-group-disable]': 'disabled'
  },
  inputs: [
    'id',
    'name',
    'checked',
    'value',
    'checkedIcon',
    'notCheckedIcon',
    'readonly'
  ],
  outputs: [
    'change'
  ]
})
export class AjfCheckboxGroupItem<T> extends AjfCoreCheckboxGroupItem<T> {
  constructor(@Optional() checkboxGroup: AjfCheckboxGroup<T>) {
    super(checkboxGroup);
    this.checkedIcon = 'checkmark';
    this.notCheckedIcon = 'close';
  }
}
