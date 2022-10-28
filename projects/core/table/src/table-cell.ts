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

export interface AjfTableCell {
  /**
   * The value to show into the table cell. It can be a string, a number, or html text.
   * If there is a dialog box to open on click, you can use something like this:
   * '<div class="read_more_cell"><p class="read_more_text">Read more</p><b class="material-icons">add_circle_outline</b></div>'
   *
   */
  value: any;

  /**
   * the css style for the cell.
   * ie: {textAlign: 'left', color: 'black'}
   */
  style: any;

  /**
   * the colspan for the cell
   */
  colspan?: number;

  /**
   * the rowspan for the cell
   */
  rowspan?: number;

  /**
   * if true and if this is a header cell, sorting is enabled on this column
   */
  sorted?: boolean;

  /**
   * contains the html to be displayed in a dialog box when you click on this cell
   */
  dialogHtml?: string;
}
