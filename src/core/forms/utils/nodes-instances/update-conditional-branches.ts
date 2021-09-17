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

import {AjfNodeInstance} from '../../interface/nodes-instances/node-instance';

/**
 * It updates instance.verifiedBranch with the idx of the last branch verified.
 * If instance.verifiedBranch value changes return true
 */
export function updateConditionalBranches(instance: AjfNodeInstance, context: AjfContext): boolean {
  const conditionalBranches = instance.conditionalBranches;

  if (conditionalBranches != null) {
    const oldBranch = instance.verifiedBranch;
    let idx = 0;
    let found = false;
    while (idx < conditionalBranches.length && !found) {
      let verified: boolean = evaluateExpression(conditionalBranches[idx].condition, context);
      if (verified) {
        found = true;
        if (idx !== instance.verifiedBranch) {
          instance.verifiedBranch = idx;
        }
      }
      idx++;
    }

    if (oldBranch !== instance.verifiedBranch) {
      return true;
    }
  }

  return false;
}
