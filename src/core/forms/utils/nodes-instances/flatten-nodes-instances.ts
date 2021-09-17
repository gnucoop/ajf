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

import {AjfContainerNodeInstance} from '../../interface/nodes-instances/container-node-instance';
import {AjfNodeInstance} from '../../interface/nodes-instances/node-instance';

import {isContainerNodeInstance} from './is-container-node-instance';
import {isFieldInstance} from './is-field-instance';

/**
 * It creates a one dimensional array of AjfNodeInstance.
 * If the node is a containerNode(has the nodes attribute)
 * recursively  concat their nodes.
 * If includeGroups is true the result also contains the containerNodeInstance.
 */
export function flattenNodesInstances(
    nodes: AjfNodeInstance[], includeGroups = false): AjfNodeInstance[] {
  let flatNodes: AjfNodeInstance[] = [];
  nodes.forEach((nodeInstance: AjfNodeInstance) => {
    if (isFieldInstance(nodeInstance)) {
      flatNodes.push(nodeInstance);
    }
    if (isContainerNodeInstance(nodeInstance)) {
      if (includeGroups) {
        flatNodes.push(nodeInstance);
      }
      flatNodes = flatNodes.concat(
          flattenNodesInstances((nodeInstance as AjfContainerNodeInstance).nodes, includeGroups));
    }
  });
  return flatNodes;
}
