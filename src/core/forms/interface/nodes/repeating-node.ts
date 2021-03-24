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

export interface AjfRepeatingNode extends AjfNode {
  // is a node group repeat condition
  // example: "opd_treatment == 'Yes' && ($groupReps || 1) || 0"
  formulaReps?: AjfFormula;

  // max number of repetitions
  maxReps: number;

  // min number of repetitions
  minReps: number;

  /**
   * If true show all slides of repeating node in readonly mode.
   * Except the last slide.
   * In the last slide remove button is always disabled and add button is enabled
   * only when the last slide is valid.
   */
  disableRemoval?: boolean;
}
