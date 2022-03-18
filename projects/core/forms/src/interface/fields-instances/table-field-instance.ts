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

import {AjfTableField} from '../fields/table-field';
import {AjfTableFormControl} from '../forms/table-form-control';
import {AjfFieldInstance} from './field-instance';

/**
 * An AjfFieldInstance with a node of type AjfTableField.
 */
export interface AjfTableFieldInstance extends AjfFieldInstance {
  node: AjfTableField;

  /**
   * If true, empty rows are not showed
   */
  hideEmptyRows: boolean;

  /**
   * List of values for the table (rows).
   * The table is horizontally organized: the first cell of each row represents
   * the 'Row Label' (like a horizontal 'column header').
   * The string|number array represents all the values in the other row cells.
   *
   * Eg.
   * {
   *   id: 1,
   *   parent: 0,
   *   name: 'row', // table name
   *   rows: [
   *     ['row__0__0', 'row__0__1', 'row__0__2],
   *     ['row__1__0', 'row__1__1', 'row__1__2],
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
   * value: [
   * ['TestRow', ['row__0__0', 'row__0__1', 'row__0__2]],
   * ['OtherTestRow', ['row__1__0', 'row__1__1', 'row__1__2]],
   * ]
   */
  value: [string, (string | number)[]][];

  /**
   * List of form control for the values
   */
  controls: [string, (string | AjfTableFormControl)[]][];

  /**
   * The table context
   */
  context: AjfContext;
}
