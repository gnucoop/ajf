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

import {AjfField} from '../../interface/fields/field';
import {componentsMap} from './fields-map';
/**
 * It is true if
 *  the field is a custom field (field.fieldType &gt; 100) and
 *  the field is not already present in the component map (componentsMap[field.fieldType] != null)
 * and the field is a fieldWithChoice (componentsMap[field.fieldType].isFieldWithChoice === true)
 */
export function isCustomFieldWithChoices(field: AjfField): boolean {
  return field.fieldType > 100 && componentsMap[field.fieldType] != null &&
      componentsMap[field.fieldType].isFieldWithChoice === true;
}
