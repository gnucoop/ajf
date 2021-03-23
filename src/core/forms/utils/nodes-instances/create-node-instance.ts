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

import {EventEmitter} from '@angular/core';
import {AjfNodeInstance} from '../../interface/nodes-instances/node-instance';

export type AjfNodeInstanceCreate = Pick<AjfNodeInstance, 'node'>&Partial<AjfNodeInstance>;

/**
 * It creates an AjfNodeInstance.
 * If instance.prefix is defined copy it else assign empty array.
 * If instance.visible is not defined assign true.
 * Assign empty array to conditionalBranches.
 * Assign new eventEmitter to updatedEvt.
 */
export function createNodeInstance(instance: AjfNodeInstanceCreate): AjfNodeInstance {
  return {
    node: instance.node,
    prefix: instance.prefix ? [...instance.prefix] : [],
    visible: instance.visible != null ? instance.visible : true,
    conditionalBranches: [],
    updatedEvt: new EventEmitter<void>()
  };
}
