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
  AjfCheckboxGroup,
  AjfCheckboxGroupItem as AjfCoreCheckboxGroupItem
} from '@ajf/core/checkbox-group';
import {ChangeDetectionStrategy, Component, Optional, ViewEncapsulation} from '@angular/core';

@Component({
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
})
export class CheckboxGroupItem<T> extends AjfCoreCheckboxGroupItem<T> {
  constructor(
      // `AjfCheckboxGroupItem` is commonly used in combination with a `AjfCheckboxGroup`.
      // tslint:disable-next-line: lightweight-tokens
      @Optional() checkboxGroup: AjfCheckboxGroup<T>,
  ) {
    super(checkboxGroup);
    this.checkedIcon = 'check_box';
    this.notCheckedIcon = 'check_box_outline_blank';
  }
}
