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

import {AjfNode} from '../../interface/nodes/node';

/**
 * It is return a new orderered nodes.
 * The newNodes are ordered recursively by parentNode.
 * The sorting begins by parent
 */
export function orderedNodes(nodes: AjfNode[], parent: number|null): AjfNode[] {
  let newNodes: AjfNode[] = [];
  nodes
      .filter(
          (n: AjfNode) => parent != null ? n.parent == parent : n.parent == null || n.parent === 0)
      .sort((n1: AjfNode, n2: AjfNode) => n1.parentNode - n2.parentNode)
      .forEach((n: AjfNode) => {
        newNodes.push(n);
        newNodes = newNodes.concat(orderedNodes(nodes, n.id));
      });
  return newNodes;
}
