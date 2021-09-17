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

import {AjfNodeGroup} from '../../interface/nodes/node-group';
import {AjfNodeType} from '../../interface/nodes/node-type';
import {AjfContainerNodeCreate, createContainerNode} from './create-container-node';
import {AjfRepeatingNodeCreate, createRepeatingNode} from './create-repeating-node';

export type AjfNodeGroupCreate = AjfContainerNodeCreate&AjfRepeatingNodeCreate;

/**
 * It creates a AjfNodeGroup
 * set nodeType to AjfNodeType.AjfNodeGroup = 2.
 * Extends an AjfNode with the merging of containerNode  attributes(nodes)
 * with repeatingNode attributes(formulaReps, minReps, maxReps)
 */
export function createNodeGroup(nodeGroup: AjfNodeGroupCreate): AjfNodeGroup {
  return {
    ...createContainerNode(nodeGroup),
    ...createRepeatingNode(nodeGroup),
    nodeType: AjfNodeType.AjfNodeGroup,
  };
}
