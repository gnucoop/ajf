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

import {AjfField} from './field';
import {AjfFieldType} from './field-type';

export interface AjfTableCell {
  /**
   * The Formula associated with the cell.
   */
  formula: string;

  /**
   * If true the formula can be overridden by input value.
   */
  editable?: boolean;
}

/**
 * An AjfField of type Table.
 *
 *
 * Eg.
 * {
 *  id: 1,
 *  parent: 0,
 *  name: 'TableName',
 *  rows: [
 *     [
 *       'TableName__0__0',
 *       'TableName__0__1',
 *       {
 *         'formula': 'TableName__0__0 + TableName__0__1'
 *         'editable': false
 *       },
 *     ],
 *     ['TableName__1__0', 'TableName__1__1', 'TableName__1__2],
 *   ],
 *   label: '2.1 Table test',
 *   editable: true,
 *   nodeType: 0,
 *   fieldType: 11,
 *   rowLabels: [
 *     'TestRow',
 *     'OtherTestRow',
 *   ],
 *   columnLabels: ['Label 1', 'Label 2', 'Label 3']
 * }
 *
 */
export interface AjfTableField extends AjfField {
  fieldType: AjfFieldType.Table;

  /**
   * The string|number array represents all the values in the row cells.
   * if string
   *  Every element of this matrix need to satisfy this format: name =
   * `${table.name}__${row.idx}__${column.idx}` This name is used also as the the control name in
   * the form formGroup.registerControl(name, tableFormControl.control);
   */
  rows: (string|AjfTableCell)[][];

  /**
   * The string array represents all the column labels.
   */
  columnLabels: string[];

  /**
   * The string array represents all the row labels.
   */
  rowLabels: string[];

  /**
   * If true, empty rows are not showed
   */
  hideEmptyRows: boolean;
}
