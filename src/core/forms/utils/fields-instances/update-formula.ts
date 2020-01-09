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

import {AjfContext, evaluateExpression} from '@ajf/core/models';

import {AjfFieldInstance} from '../../interface/fields-instances/field-instance';
import {nodeInstanceCompleteName} from '../nodes-instances/node-instance-complete-name';

/**
 * update the relative instance value and the context
 * if !editable evaluate expression once one time and flag changed is false
 */
export function updateFormula(
    instance: AjfFieldInstance, context: AjfContext): {changed: boolean, value: any} {
  const formula = instance.formula;
  const editable = instance.node.editable;
  if (formula != null && instance.visible && (!editable || (editable && instance.value == null))) {
    let newValue: any = evaluateExpression(formula.formula, context);
    const oldValue = instance.value;
    if (newValue !== instance.value) {
      instance.value = newValue;
      context[nodeInstanceCompleteName(instance)] = instance.value;
      context.$value = instance.value;
    }
    return {changed: newValue !== oldValue, value: newValue};
  }
  return {changed: false, value: instance.value};
}
