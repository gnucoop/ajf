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

import {AjfCondition, AjfFormula} from '@ajf/core/models';
import {EventEmitter} from '@angular/core';

import {AjfField} from '../fields/field';
import {AjfNodeInstance} from '../nodes-instances/node-instance';
import {AjfValidationGroup} from '../validation/validation-group';
import {AjfValidationResult} from '../validation/validation-results';
import {AjfWarningGroup} from '../warning/warning-group';
import {AjfWarningResult} from '../warning/warning-result';

export interface AjfFieldInstance extends AjfNodeInstance {
  // if the field pass the validation
  valid: boolean;
  node: AjfField;
  // the value of field
  value: any;
  formula?: AjfFormula;
  validation?: AjfValidationGroup;
  warning?: AjfWarningGroup;
  nextSlideCondition?: AjfCondition;
  validationResults?: AjfValidationResult[];
  warningResults?: AjfWarningResult[];
  warningTrigger: EventEmitter<void>;
}
