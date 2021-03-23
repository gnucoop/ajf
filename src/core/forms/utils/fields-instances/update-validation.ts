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

import {AjfContext, evaluateExpression} from '@ajf/core/models';

import {AjfFieldInstance} from '../../interface/fields-instances/field-instance';
import {AjfValidationResult} from '../../interface/validation/validation-results';
import {nodeInstanceCompleteName} from '../nodes-instances/node-instance-complete-name';
import {evaluateValidationGroup} from '../validation/evaluate-validation-group';
/**
 * it updates the instance.valid attribute.
 * If validation is not defined the instance.valid is true.
 * If valdiation.forceValue is true update context.
 * Updates instance.valid with the re-evaluation of validationResults in AND.
 */
export function updateValidation(
    instance: AjfFieldInstance, context: AjfContext, supplementaryInformations?: any): void {
  const validation = instance.validation;
  if (validation == null) {
    instance.valid = true;
    return;
  }
  // TODO what is this??
  if (supplementaryInformations) {
    Object.keys(supplementaryInformations).forEach((key) => {
      context[`__supplementary__${key}__`] = supplementaryInformations[key];
    });
  }

  const completeName = nodeInstanceCompleteName(instance);

  if (context[completeName] != null && validation && validation.forceValue) {
    instance.value = evaluateExpression(validation.forceValue.condition, context);
    context[completeName] = instance.value;
    context.$value = instance.value;
  }

  instance.validationResults = evaluateValidationGroup(validation, context[completeName], context);
  instance.valid = instance.validationResults.reduce(
      (prev: boolean, x: AjfValidationResult) => prev && x.result, true);
}
