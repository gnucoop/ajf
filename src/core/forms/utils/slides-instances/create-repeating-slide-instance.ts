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

import {AjfNodeType} from '../../interface/nodes/node-type';
import {AjfRepeatingSlideInstance} from '../../interface/slides-instances/repeating-slide-instance';
import {AjfSlideInstanceCreate, createSlideInstance} from './create-slide-instance';

export type AjfRepeatingSlideInstanceCreate = Omit<AjfSlideInstanceCreate, 'node'>&
    Pick<AjfRepeatingSlideInstance, 'node'>&Partial<AjfRepeatingSlideInstance>;

/**
 * It creates AjfRepeatingSlideInstance.
 * Init slideNodes, nodes and flatNodes with empty array,
 * Init reps as with 0.
 */
export function createRepeatingSlideInstance(instance: AjfRepeatingSlideInstanceCreate):
    AjfRepeatingSlideInstance {
  const {node, ...slideInstanceCreate} = instance;
  const {nodeType, ...slideNode} = node;
  const slideInstance = createSlideInstance(
      {...slideInstanceCreate, node: {nodeType: AjfNodeType.AjfSlide, ...slideNode}});
  return {
    ...slideInstance,
    node: instance.node,
    slideNodes: [],
    formulaReps: instance.formulaReps,
    reps: 0,
    nodes: [],
    flatNodes: [],
  };
}
