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

import {AjfFormula} from '@ajf/core/models';

import {AjfNode} from './node';

/**
 * Interface that is extended to represent a Repeating Node.
 * Repeating nodes are used any time a node can or must be repeated
 * N times, where N is the value of the "formulaReps" property.
 */
export interface AjfRepeatingNode extends AjfNode {

  /**
   * Is the number of node repetition
   * Example: "opd_treatment == 'Yes' && ($groupReps || 1) || 0"
   */
  // TODO(peppedeka) WARNING: currently, formulaReps is NOT evaluated.
  // If formulaReps is set to any value, no repetition is allowed.
  // The number of possible repetitions is currently determined by maxReps (if set).
  formulaReps?: AjfFormula;

  /**
   *  Max number of repetitions
   */
  maxReps: number;

  /**
   *  Min number of repetitions
   */
  minReps: number;
}
