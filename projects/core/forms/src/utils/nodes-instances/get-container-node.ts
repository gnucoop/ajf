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
import {isContainerNode} from '../nodes/is-container-node';

/**
 * It returns the container node of the node.
 */
export function getContainerNode(
  allNodes: (AjfNode | AjfNodeInstance)[],
  node: AjfNode,
): AjfNode | null {
  let parentNode: AjfNode | null = null;
  let curParent: number | null = node.parent;
  while (curParent != null && parentNode == null) {
    const curNode = allNodes
      .map((n: AjfNode | AjfNodeInstance) => (n as AjfNodeInstance).node || (n as AjfNode))
      .find(n => n.id == curParent);
    if (curNode) {
      if (isContainerNode(curNode)) {
        parentNode = curNode;
      }
    }
    curParent = curNode != null ? curNode.parent : null;
  }
  return parentNode;
}
