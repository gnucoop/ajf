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

import {AjfNodeInstance} from '../../interface/nodes-instances/node-instance';
import {AjfNode} from '../../interface/nodes/node';
import {AjfNodeGroup} from '../../interface/nodes/node-group';
import {isField} from '../nodes/is-field';

import {getAncestorRepeatingNodes} from './get-ancestor-repeating-nodes';

/**
 * Returns all childs node.name of the node's ancestor (includes itself).
 * It is a key-value dictionary, key is the name of the node and
 * value is the position inside ancestorRepeatingNodes.
 */
export function getAncestorRepeatingNodesNames(
    allNodes: (AjfNode|AjfNodeInstance)[], node: AjfNode): {[prop: string]: number} {
  let names: {[prop: string]: number} = {};
  const nodeGroups = getAncestorRepeatingNodes(allNodes, node) as AjfNodeGroup[];
  nodeGroups.forEach((n, idx) => (n.nodes || []).forEach((sn) => {
    if (isField(sn)) {
      names[sn.name] = idx;
    }
  }));
  return names;
}
