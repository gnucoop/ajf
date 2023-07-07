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

import {notEmpty} from '@ajf/core/models';
import {AjfValidation} from '../../interface/validation/validation';
import {AjfValidationGroup} from '../../interface/validation/validation-group';
import {AjfValidationResult} from '../../interface/validation/validation-results';
import {evaluateValidation} from './evaluate-validation';

/**
 * Basic validation function that cheecks the value is not null
 * notEmpty is the associated AjfCondition
 */
export function evaluateValidationNotEmpty(
  validation: AjfValidationGroup,
  value: any,
): AjfValidationResult | null {
  const ne = validation.notEmpty as AjfValidation | boolean | undefined;
  if (ne == null || ne === false) {
    return null;
  }
  if (ne === true) {
    return {
      result: notEmpty(value),
      error: validation.notEmptyMessage || 'Value must not be empty',
      clientValidation: false,
    };
  }
  return evaluateValidation(ne, {'$value': value});
}
