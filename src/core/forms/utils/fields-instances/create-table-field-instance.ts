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

import {AjfTableFieldInstance} from '../../interface/fields-instances/table-field-instance';
import {AjfTableCell, AjfTableField} from '../../interface/fields/table-field';

import {AjfFieldInstanceCreate, createFieldInstance} from './create-field-instance';

export type AjfTableFieldInstanceCreate = AjfFieldInstanceCreate&Partial<AjfTableFieldInstance>;
/**
 * to mantain retrocompatibility with old string type convert string to AjfTableCell
 * check  node.rows: (string|AjfTableCell)[][];
 * if elem of map is string convert in to AjfTableCell object
 */
function normalizeRows(node: AjfTableField): void {
  node.rows.forEach((row, rowIdx) => {
    row.forEach((elem, elemIdx) => {
      if (typeof elem === 'string') {
        node.rows[rowIdx][elemIdx] = {formula: elem, editable: node.editable} as AjfTableCell;
      }
    });
  });
}

/**
 * Create an Table Fieldinstance.
 * Extends simple field instance with context,hideEmptyRows and controls.
 * If hideEmptyRows is not defined in instance set with false.
 * Assign empty array to controls
 */
export function createTableFieldInstance(
    instance: AjfTableFieldInstanceCreate, context: AjfContext): AjfTableFieldInstance {
  normalizeRows(instance.node as AjfTableField);
  const fieldInstance = createFieldInstance(instance, context);
  return {
    ...fieldInstance,
    node: instance.node,
    context,
    hideEmptyRows: instance.hideEmptyRows || false,
    controls: []
  };
}
