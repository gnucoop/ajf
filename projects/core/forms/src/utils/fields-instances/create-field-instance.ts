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
import {EventEmitter} from '@angular/core';

import {AjfFieldInstance} from '../../interface/fields-instances/field-instance';
import {AjfNode} from '../../interface/nodes/node';
import {AjfNodeInstanceCreate, createNodeInstance} from '../nodes-instances/create-node-instance';
import {nodeInstanceCompleteName} from '../nodes-instances/node-instance-complete-name';

export type AjfFieldInstanceCreate = AjfNodeInstanceCreate & Partial<AjfFieldInstance>;

/**
 * Create a field instance and init the value of the field by cascade conditions.
 *
 * First check if the value is in the context by node name.
 * Second check if the value is in the context by complete name.
 * Third check if the field has a default value (only if field is visible and its container is visible).
 * Else value is null.
 *
 * If instance validationResultsis is not defined assign empty array.
 * If instance warningResults is not defined assign empty array.
 * Init valid with false.
 */
export function createFieldInstance(
  instance: AjfFieldInstanceCreate,
  context: AjfContext,
  containerNode?: AjfNode | null,
): AjfFieldInstance {
  const nodeInstance = createNodeInstance(instance);
  let value: any = null;
  if (nodeInstance.node != null && context != null) {
    const completeName = nodeInstanceCompleteName(nodeInstance);
    if (context[nodeInstance.node.name] != null) {
      value = context[nodeInstance.node.name];
    } else if (context[completeName] != null) {
      value = context[completeName];
    } else if (instance.node.defaultValue != null) {
      let visibility = nodeInstance.node.visibility
        ? evaluateExpression(nodeInstance.node.visibility.condition, context)
        : nodeInstance.visible;

      if (visibility && containerNode && containerNode.visibility) {
        visibility = evaluateExpression(containerNode.visibility.condition, context);
      }
      if (visibility) {
        if (instance.node.defaultValue.formula != null) {
          context[completeName] = evaluateExpression(instance.node.defaultValue.formula, context);
        } else {
          context[completeName] = instance.node.defaultValue;
        }
      }
      value = context[completeName];
    }
  }

  let isFieldEditable = instance.editable;
  if (isFieldEditable == null) {
    isFieldEditable = instance.node.editable != null ? instance.node.editable : true;
  }
  return {
    ...nodeInstance,
    editable: isFieldEditable,
    node: instance.node,
    value,
    valid: false,
    validationResults: instance.validationResults || [],
    warningResults: instance.warningResults || [],
    warningTrigger: new EventEmitter<void>(),
  };
}
