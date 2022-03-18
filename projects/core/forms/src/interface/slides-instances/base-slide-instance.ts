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

import {AjfContainerNodeInstance} from '../nodes-instances/container-node-instance';
import {AjfNodeInstance} from '../nodes-instances/node-instance';

/**
 * An AjfContainerNodeInstance of type slide
 */
export interface AjfBaseSlideInstance extends AjfContainerNodeInstance {
  /**
   * The slide nodes.
   * AjfSlideInstance use only the first element of the array.
   * AjfRepeatingSlideInstance use one element for each repeating slide.
   */
  slideNodes: AjfNodeInstance[][];

  /**
   * False if at least one of the nodes is not valid
   */
  valid: boolean;

  /**
   * The current position of the slide
   */
  position: number;
}
