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
import {AjfFormulaFieldInstance} from '../../interface/fields-instances/formula-field-instance';
import {updateConditionalBranches} from '../nodes-instances/update-conditional-branches';
import {updateVisibility} from '../nodes-instances/update-visibility';
import {updateFormula} from './update-formula';
import {updateNextSlideCondition} from './update-next-slide-condition';
import {updateValidation} from './update-validation';
import {updateWarning} from './update-warning';

/**
 * It grab all the field instance update functions.
 */
export function updateFieldInstanceState(
    instance: AjfFieldInstance, context: AjfContext, branchVisibility = true): void {
  updateVisibility(instance, context, branchVisibility);
  updateConditionalBranches(instance, context);
  updateFormula(instance as AjfFormulaFieldInstance, context);
  updateValidation(instance, context);
  updateWarning(instance, context);
  updateNextSlideCondition(instance, context);
}
