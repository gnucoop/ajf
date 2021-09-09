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

import {AjfCondition, AjfContext, evaluateExpression} from '@ajf/core/models';

import {AjfSlideInstance} from '../../interface/slides-instances/slide-instance';

export function updateEditability(instance: AjfSlideInstance, context: AjfContext): boolean {
  if (instance.readonly == null) {
    instance.editable = true;
    return true;
  }
  const readOnly: AjfCondition = instance.readonly;

  const oldEditability: boolean = instance.editable;
  let newEditability: boolean = !evaluateExpression(readOnly.condition, context);
  if (newEditability !== instance.editable) {
    instance.editable = newEditability;
  }

  return oldEditability !== newEditability;
}
