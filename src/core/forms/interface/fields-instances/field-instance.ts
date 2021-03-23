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

/**
 * An AjfNodeInstance with a node of type AjfField.
 */
export interface AjfFieldInstance extends AjfNodeInstance {

  /**
   * True if the field pass the validation
   */
  valid: boolean;

  /**
   * The AjfField blueprint
   */
  node: AjfField;

  /**
   * The value of the field
   */
  value: any;

  /**
   * A formula used to derive the value of the field.
   */
  formula?: AjfFormula;

  /**
   * A set of conditions that defines if the Field value is valid.
   */
  validation?: AjfValidationGroup;

  /**
   * A set of conditions that defines if warning must be shown.
   */
  warning?: AjfWarningGroup;

  // @TODO(Marco, Peppe, Sara, Trik): See AjfField (Check if it is actually used and what it is)
  nextSlideCondition?: AjfCondition;

  /**
   * The results of the evaluation of the validation group conditions
   */
  validationResults?: AjfValidationResult[];

  /**
   * The results of the evaluation of the warning group conditions
   */
  warningResults?: AjfWarningResult[];

  /**
   * Emitted when there are warningResults
   */
  warningTrigger: EventEmitter<void>;
}
