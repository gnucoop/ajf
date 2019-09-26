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

import {Type} from '@angular/core';

import {AjfBaseFieldComponent} from './base-field';
import {AjfFieldComponentsMap} from './field-components-map';

export abstract class AjfFieldService {
  readonly componentsMap: AjfFieldComponentsMap;

  registerCustomField(fieldType: number, component: Type<AjfBaseFieldComponent>): void {
    if (fieldType < 100) {
      throw new Error('Invalid custom field type, it must be greater than 100');
    }
    if (component == null) {
      throw new Error('Invalid custom field component');
    }
    this.componentsMap[fieldType] = {component};
  }
}
