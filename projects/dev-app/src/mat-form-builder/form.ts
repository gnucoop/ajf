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

import {AjfFieldType, AjfForm, AjfNodeType} from '@ajf/core/forms';

export const formSchema: AjfForm = {
  nodes: [
    {
      id: 1,
      parent: 0,
      parentNode: 0,
      label: 'Slide 1',
      name: 'slide_1',
      nodeType: AjfNodeType.AjfSlide,
      nodes: [
        {
          id: 101,
          parent: 1,
          parentNode: 0,
          label: 'Field 1',
          name: 'field_1',
          nodeType: AjfNodeType.AjfField,
          fieldType: AjfFieldType.Number,
          editable: true,
          conditionalBranches: [],
          defaultValue: null,
          size: 'normal',
        },
      ],
      conditionalBranches: [],
    },
    {
      id: 2,
      parent: 1,
      parentNode: 0,
      label: 'Slide 2',
      name: 'slide_2',
      nodeType: AjfNodeType.AjfSlide,
      nodes: [
        {
          id: 201,
          name: 'table_1',
          rows: [
            [
              'table_1__0__0',
              'table_1__0__1',
              {
                formula: 'field_1',
                editable: false,
              },
            ],
            [
              'table_1__1__0',
              'table_1__1__1',
              {
                formula: 'field_3',
                editable: false,
              },
            ],
          ],
          size: 'normal',
          label: 'Table',
          parent: 2,
          editable: true,
          nodeType: AjfNodeType.AjfField,
          fieldType: AjfFieldType.Table,
          rowLabels: ['1\u00b0', '2\u00b0'],
          parentNode: 0,
          columnTypes: ['number', 'text'],
          columnLabels: ['number', 'text'],
          defaultValue: null,
          conditionalBranches: [],
          hideEmptyRows: false,
          visibility: {
            condition: '!notEmpty(field_1)',
          },
        },
      ],
      conditionalBranches: [],
    },
    {
      id: 3,
      parent: 2,
      parentNode: 0,
      label: 'Slide 3',
      name: 'slide_3',
      nodeType: AjfNodeType.AjfSlide,
      nodes: [
        {
          id: 301,
          parent: 3,
          parentNode: 0,
          label: 'Field 3',
          name: 'field_3',
          nodeType: AjfNodeType.AjfField,
          fieldType: AjfFieldType.Number,
          editable: true,
          conditionalBranches: [],
          defaultValue: null,
          size: 'normal',
        },
      ],
      conditionalBranches: [],
    },
  ],
  choicesOrigins: [],
  attachmentsOrigins: [],
  stringIdentifier: [],
};
