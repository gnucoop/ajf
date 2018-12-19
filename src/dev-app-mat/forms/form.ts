/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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

export const formSchema = {
  choicesOrigins: [],
  nodes: [{
    id: 1,
    parent: 0,
    parentNode: 0,
    nodeType: 3,
    name: 'slide_1',
    label: 'Slide 1',
    nodes: [{
      id: 2,
      parent: 1,
      parentNode: 0,
      nodeType: 0,
      fieldType: 2,
      name: 'field_1',
      label: 'Field 1',
      visibility: {
        condition: 'true'
      }
    }, {
      id: 3,
      parent: 2,
      parentNode: 0,
      nodeType: 0,
      fieldType: 2,
      name: 'field_2',
      label: 'Field 2',
      visibility: {
        condition: 'field_1 == 1'
      }
    }, {
      id: 4,
      parent: 3,
      parentNode: 0,
      nodeType: 0,
      fieldType: 2,
      name: 'field_3',
      label: 'Field 3',
      visibility: {
        condition: 'field_1 != 1'
      },
      formula: {
        formula: 'field_1 * 2'
      }
    }]
  }]
};
