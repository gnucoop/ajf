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
 * Basic validation function that cheecks the maximum digit's length.
 * maxDigits is the associated AjfCondition
 */
export function evaluateValidationMaxDigits(
    validation: AjfValidationGroup, value: any): AjfValidationResult|null {
  if (validation.maxDigits == null) {
    return null;
  }
  const ctx = {'$value': value};
  if (typeof validation.maxDigits === 'number') {
    return {
      result: evaluateExpression(`$value.toString().length <= ${validation.maxDigits}`, ctx),
      error: `Digits count must be <= ${validation.maxDigits}`,
      clientValidation: false
    };
  }
  return evaluateValidation(validation.maxDigits, ctx);
}
