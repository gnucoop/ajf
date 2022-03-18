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

import {AjfContext} from '@ajf/core/models';

import {AjfFieldInstance} from '../../interface/fields-instances/field-instance';
import {nodeInstanceCompleteName} from '../nodes-instances/node-instance-complete-name';
import {evaluateWarningGroup} from '../warning/evaluate-warning-group';

/**
 * It Updates instance warining results.
 * If instance.warning in null return.
 * If nodeInstanceCompleteName is in context and warning is defined re-evaluate warning group
 */
export function updateWarning(instance: AjfFieldInstance, context: AjfContext): void {
  const warning = instance.warning;
  if (warning == null) {
    return;
  }

  const completeName = nodeInstanceCompleteName(instance);

  if (context[completeName] != null && warning) {
    instance.warningResults = evaluateWarningGroup(warning, context);
  }
}
