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
import {AjfSlideInstance} from '../../interface/slides-instances/slide-instance';
import {flattenNodesInstances} from './flatten-nodes-instances';
import {isSlidesInstance} from './is-slides-instance';

/**
 * It creates a one dimensional array of AjfSlideInstance.
 * If the node is a slides node recursively  concat their nodes.
 */
export function flattenNodesInstancesTree(nodes: AjfNodeInstance[]): AjfSlideInstance[] {
  let flatTree: AjfSlideInstance[] = [];
  nodes.forEach((nodeInstance: AjfNodeInstance) => {
    if (isSlidesInstance(nodeInstance)) {
      const ni = nodeInstance as AjfSlideInstance;
      flatTree.push(ni);
      ni.flatNodes = flattenNodesInstances(ni.nodes);
    }
  });
  return flatTree;
}
