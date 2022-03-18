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

import {AjfContainerNode} from '../../interface/nodes/container-node';
import {AjfNode} from '../../interface/nodes/node';
import {isContainerNode} from './is-container-node';
/**
 * It creates an one dimensional array of AjfNode.
 * If the node is a containerNode(has the nodes attribute)
 * recursively  concat their nodes.
 */
export function flattenNodes(nodes: AjfNode[]): AjfNode[] {
  let flatNodes: AjfNode[] = [];
  nodes.forEach((node: AjfNode) => {
    flatNodes.push(node);
    if (isContainerNode(node)) {
      flatNodes = flatNodes.concat(flattenNodes((node as AjfContainerNode).nodes));
    }
  });
  return flatNodes;
}
