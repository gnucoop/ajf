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
import {EventEmitter} from '@angular/core';

import {AjfFieldInstance} from '../../interface/fields-instances/field-instance';
import {AjfNodeInstanceCreate, createNodeInstance} from '../nodes-instances/create-node-instance';
import {nodeInstanceCompleteName} from '../nodes-instances/node-instance-complete-name';

export type AjfFieldInstanceCreate = AjfNodeInstanceCreate&Partial<AjfFieldInstance>;

/**
 * Create a field instance and init the value of the field by cascade conditions.
 *
 * First check if the value is in the context by node name.
 * Second check if the value is in the context by complete name.
 * Third check if the field has a default value.
 * Else value is null.
 *
 * If instance validationResultsis is not defined assign empty array.
 * If instance warningResults is not defined assign empty array.
 * Init valid with false.
 */
export function createFieldInstance(
    instance: AjfFieldInstanceCreate, context: AjfContext): AjfFieldInstance {
  const nodeInstance = createNodeInstance(instance);
  let value: any = null;
  if (nodeInstance.node != null && context != null) {
    const completeName = nodeInstanceCompleteName(nodeInstance);
    if (context[nodeInstance.node.name] != null) {
      value = context[nodeInstance.node.name];
    } else if (context[completeName] != null) {
      value = context[completeName];
    } else if (instance.node.defaultValue != null) {
      context[completeName] = instance.node.defaultValue;
      value = context[completeName];
    }
  }
  return {
    ...nodeInstance,
    node: instance.node,
    value,
    valid: false,
    validationResults: instance.validationResults || [],
    warningResults: instance.warningResults || [],
    warningTrigger: new EventEmitter<void>(),
  };
}
