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

import {AjfAttachmentsOrigin} from '../attachments/attachments-origin';
import {AjfNode} from '../nodes/node';
import {AjfNodeType} from '../nodes/node-type';
import {AjfValidationGroup} from '../validation/validation-group';
import {AjfWarningGroup} from '../warning/warning-group';
import {AjfFieldSize} from './field-size';
import {AjfFieldType} from './field-type';

/**
 * An ajf node of type Field. It is the building block for all the Fields in a Form.
 */
export interface AjfField extends AjfNode {
  /**
   * Type of the node.
   */
  nodeType: AjfNodeType.AjfField;

  /**
   * Type of the Field.
   */
  fieldType: AjfFieldType;

  /**
   * A brief description of the Field.
   */
  description?: string;

  /**
   * If set to true the Field input is editable
   */
  // @TODO(Marco, Peppe, Sara): Check if it is actually used and works as intended
  editable: boolean;

  /**
   * A formula used to derive the value of the field.
   * If set, makes the field input read-only (not editable).
   */
  formula?: AjfFormula;

  /**
   * The default value of the Field
   */
  defaultValue: any;

  /**
   * The size of the Field to be used when the Field is rendered
   */
  size: AjfFieldSize;

  /**
   * A set of conditions that defines if the Field value is valid.
   */
  validation?: AjfValidationGroup;

  /**
   * A set of conditions that defines if warning must be shown.
   */
  // @TODO(Marco, Peppe, Sara): Check if it is actually used and works as intended
  warning?: AjfWarningGroup;

  // @TODO(Marco, Peppe, Sara): Check if it is actually used and what it is
  nextSlideCondition?: AjfCondition;

  /**
   * The origin of the attachments related to the field.
   */
  attachmentOrigin?: AjfAttachmentsOrigin<any>;

  /**
   * Any attachments (files uploaded on the form) related to the field.
   */
  attachments?: any[];
  /*
   * Hint text visualized in tooltip used
   * to explain the mean of field
   */
  hint?: string;
  /**
   * Hint icon showed as anchor of hint
   */
  hintIcon?: string;

  // @TODO(Marco, Peppe, Sara, Trik): Check if both are used and why attachments is of type 'any[]'
  // and not 'AjfAttachment[]'.
}
