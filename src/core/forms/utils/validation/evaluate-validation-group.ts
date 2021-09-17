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

import {AjfContext} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';

import {AjfValidationGroup} from '../../interface/validation/validation-group';
import {AjfValidationResult} from '../../interface/validation/validation-results';

import {evaluateValidationConditions} from './evaluate-validation-conditions';
import {evaluateValidationMaxDigits} from './evaluate-validation-max-digits';
import {evaluateValidationMaxValue} from './evaluate-validation-max-value';
import {evaluateValidationMinDigits} from './evaluate-validation-min-digits';
import {evaluateValidationMinValue} from './evaluate-validation-min-value';
import {evaluateValidationNotEmpty} from './evaluate-validation-not-empty';

/**
 * It evaluate AjfValidationGroup and returns an AjfValidationResult[].
 */
export function evaluateValidationGroup(
    validation: AjfValidationGroup, value: any, context?: AjfContext): AjfValidationResult[] {
  let res: AjfValidationResult[] = [];
  let ctx = deepCopy(context);
  ctx['$value'] = value;
  res = evaluateValidationConditions(validation, ctx);
  if (validation.maxValue) {
    const maxValue = evaluateValidationMaxValue(validation, value);
    if (maxValue != null) {
      res.push(maxValue);
    }
  }
  if (validation.minValue) {
    const minValue = evaluateValidationMinValue(validation, value);
    if (minValue != null) {
      res.push(minValue);
    }
  }
  if (validation.notEmpty) {
    const notEmpty = evaluateValidationNotEmpty(validation, value);
    if (notEmpty != null) {
      res.push(notEmpty);
    }
  }
  if (validation.maxDigits) {
    const maxDigits = evaluateValidationMaxDigits(validation, value);
    if (maxDigits != null) {
      res.push(maxDigits);
    }
  }
  if (validation.minDigits) {
    const minDigits = evaluateValidationMinDigits(validation, value);
    if (minDigits != null) {
      res.push(minDigits);
    }
  }
  return res;
}
