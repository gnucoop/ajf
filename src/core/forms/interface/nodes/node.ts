/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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

export interface AjfNode {
  nodeType: AjfNodeType;

  // node identification number
  id: number;

  // id of predecessor node
  parent: number;

  // is a id of parent node,  if this node is part of an AjfNodeGroup
  parentNode: number;

  // an AjfCondition array
  conditionalBranches: AjfCondition[];

  // the name of the field
  name: string;

  // hte label of the field
  label: string;

  // AjfCondition for handling visibility
  visibility?: AjfCondition;
}
