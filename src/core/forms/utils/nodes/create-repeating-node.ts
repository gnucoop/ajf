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

import {AjfRepeatingNode} from '../../interface/nodes/repeating-node';
import {AjfNodeCreate, createNode} from './create-node';

export type AjfRepeatingNodeCreate = AjfNodeCreate&Partial<AjfRepeatingNode>;
/**
 * It creates an AjfRepeatingNode.
 * It extends AjfNode with formulaReps, minReps, maxReps by schema.
 * If minReps is not defined assign 1.
 * If maxReps is not defined assign 0.
 */
export function createRepeatingNode(repeatingNode: AjfRepeatingNodeCreate): AjfRepeatingNode {
  const node = createNode(repeatingNode);
  return {
    ...repeatingNode,
    ...node,
    minReps: repeatingNode.minReps != null ? repeatingNode.minReps : 1,
    maxReps: repeatingNode.maxReps != null ? repeatingNode.maxReps : 0,
  };
}
