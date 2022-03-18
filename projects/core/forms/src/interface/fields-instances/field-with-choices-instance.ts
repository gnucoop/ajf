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

import {AjfChoice} from '../choices/choice';
import {AjfFieldWithChoices} from '../fields/field-with-choices';

import {AjfFieldInstance} from './field-instance';

/**
 * An AjfFieldInstance with a node of type AjfFieldWithChoicesInstance.
 */
export interface AjfFieldWithChoicesInstance<T> extends AjfFieldInstance {
  node: AjfFieldWithChoices<T>;

  /**
   * The filtered choices list, originally taken from json schema
   */
  filteredChoices: AjfChoice<any>[];

  /**
   * A formula to filter choices elements
   */
  choicesFilter?: AjfFormula;

  // TODO: Check again when we'll comment the Form Renderer or any code relative
  // to the triggerConditions.
  triggerConditions?: AjfCondition[];
  firstTriggerConditionDone: any;
  selectionTrigger: EventEmitter<void>;
}
