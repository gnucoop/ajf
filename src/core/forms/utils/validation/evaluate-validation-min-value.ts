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

import {evaluateExpression} from '@ajf/core/models';
import {AjfValidationGroup} from '../../interface/validation/validation-group';
import {AjfValidationResult} from '../../interface/validation/validation-results';
import {evaluateValidation} from './evaluate-validation';

/**
 * Basic validation function that cheecks the minimum value of the digit
 * minValue is the associated AjfCondition
 */
export function evaluateValidationMinValue(
    validation: AjfValidationGroup, value: any): AjfValidationResult|null {
  if (validation.minValue == null) {
    return null;
  }
  const ctx = {'$value': value};
  if (typeof validation.minValue === 'number') {
    return {
      result: evaluateExpression(`$value.length <= ${validation.minValue}`, ctx),
      error: `Value must be >= ${validation.minValue}`,
      clientValidation: false
    };
  }
  return evaluateValidation(validation.minValue, {'$value': value});
}
