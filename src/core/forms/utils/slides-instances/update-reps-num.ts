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

import {AjfRepeatingNodeInstance} from '../../interface/nodes-instances/repeating-node-instance';
import {nodeInstanceCompleteName} from '../nodes-instances/node-instance-complete-name';

/**
 * It upodates AjfRepeatingNodeInstance reps and it returns oldReps.
 */
export function updateRepsNum(instance: AjfRepeatingNodeInstance, context?: AjfContext): number {
  const oldReps: number = instance.reps || 0;
  context = context || {};
  if (instance.node.formulaReps == null) {
    const ctxReps = context[nodeInstanceCompleteName(instance)];
    if (ctxReps != null) {
      instance.reps = ctxReps;
    } else if (oldReps == 0) {
      instance.reps = 1;
    }
  } else {
    let newReps = evaluateExpression(instance.node.formulaReps.formula, context);
    if (newReps !== oldReps) {
      instance.reps = newReps;
    }
  }
  instance.canAdd = instance.node.maxReps === 0 || instance.reps < instance.node.maxReps;
  instance.canRemove = instance.node.minReps === 0 || instance.reps > instance.node.minReps;
  return oldReps;
}
