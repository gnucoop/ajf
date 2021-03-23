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

import {alwaysCondition} from '@ajf/core/models';

import {AjfNode} from '../../interface/nodes/node';

export type AjfNodeCreate = Pick<AjfNode, 'nodeType'|'id'|'parent'|'name'>&Partial<AjfNode>;
/**
 * It creates an AjfNode by schema.
 * If conditionalBranches is not defined assign {condition: 'true'}.
 * If parentNode is not defined assign 0.
 * If label is not defined assign ''.
 * If visibility is not defined assign {condition: 'true'}.
 */
export function createNode(node: AjfNodeCreate): AjfNode {
  const conditionalBranches =
      node.conditionalBranches != null && node.conditionalBranches.length > 0 ?
      node.conditionalBranches :
      [alwaysCondition()];
  return {
    ...node,
    parentNode: node.parentNode != null ? node.parentNode : 0,
    label: node.label || '',
    visibility: node.visibility || alwaysCondition(),
    conditionalBranches,
  };
}
