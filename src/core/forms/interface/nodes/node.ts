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

import {AjfCondition} from '@ajf/core/models';
import {AjfNodeType} from './node-type';

/**
 * The base element of ajf forms (for example a slide or a field).
 * Can contain other nodes in a recursive nodes tree.
 */
export interface AjfNode {
  /**
   * The node type
   */
  nodeType: AjfNodeType;

  /**
   * Node identification number
   */
  id: number;

  /**
   * Id of the parent node
   */
  parent: number;

  /**
   * The index of the condition in the conditionalBranches array of the parent node
   * that determines if the current branch should be followed.
   * (eg.
   *    parentNode.id = 1
   *    parentNode.conditionalBranches = ['x &gt; 1', 'x &lt;= 1', 'true'];
   *    myCurrentNode.parent = 1
   *    myCurrentNode.parentNode = 0;
   *
   * In this case, if the condition 'x &gt; 1' is met, the current branch will be followed ).
   */
  parentNode: number;

  /**
   * List of conditions that determines the branch to be followed
   */
  conditionalBranches: AjfCondition[];

  /**
   * The name of the field
   */
  name: string;

  /**
   * The label of the field
   */
  label: string;

  /**
   * AjfCondition for handling visibility
   */
  visibility?: AjfCondition;
}
