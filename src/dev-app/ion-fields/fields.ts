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

import {AjfFieldInstance, AjfFieldType, createField, createFieldInstance} from '@ajf/core/forms';

const choices = [
  {value: 'option1', label: 'Option1'}, {value: 'option2', label: 'Option2'},
  {value: 'option3', label: 'Option3'}
];

export const fields: {name: string, instance: AjfFieldInstance}[] = [
  {
    name: 'String',
    instance: createFieldInstance(
        {
          node: createField({
            id: 1,
            name: 'string_field',
            parent: 0,
            parentNode: 0,
            fieldType: AjfFieldType.String
          })
        },
        {}),
  },
  {
    name: 'Text',
    instance: createFieldInstance(
        {
          node: createField(
              {id: 1, name: 'text_field', parent: 0, parentNode: 0, fieldType: AjfFieldType.Text})
        },
        {}),
  },
  {
    name: 'Number',
    instance: createFieldInstance(
        {
          node: createField({
            id: 1,
            name: 'number_field',
            parent: 0,
            parentNode: 0,
            fieldType: AjfFieldType.Number
          })
        },
        {}),
  },
  {
    name: 'Boolean',
    instance: createFieldInstance(
        {
          node: createField({
            id: 1,
            name: 'boolean_field',
            parent: 0,
            parentNode: 0,
            fieldType: AjfFieldType.Boolean
          })
        },
        {}),
  },
  {
    name: 'Formula',
    instance: createFieldInstance(
        {
          node: createField({
            id: 1,
            name: 'formula_field',
            parent: 0,
            parentNode: 0,
            fieldType: AjfFieldType.Formula
          })
        },
        {}),
  },
  {
    name: 'Date',
    instance: createFieldInstance(
        {
          node: createField(
              {id: 1, name: 'date_field', parent: 0, parentNode: 0, fieldType: AjfFieldType.Date})
        },
        {}),
  },
  {
    name: 'Date input',
    instance:
        createFieldInstance(
            {
              node: createField({
                id: 1,
                name: 'date_input_field',
                parent: 0,
                parentNode: 0,
                fieldType: AjfFieldType.DateInput
              })
            },
            {}),
  },
  {
    name: 'Single choice',
    instance:
        {
          ...createFieldInstance(
              {
                node: createField({
                  id: 1,
                  name: 'single_choice_field',
                  parent: 0,
                  parentNode: 0,
                  fieldType: AjfFieldType.SingleChoice
                })
              },
              {}),
          filteredChoices: choices
        } as any
  },
  {
    name: 'Multiple choice',
    instance:
        {
          ...createFieldInstance(
              {
                node: createField({
                  id: 1,
                  name: 'multiple_choice_field',
                  parent: 0,
                  parentNode: 0,
                  fieldType: AjfFieldType.MultipleChoice
                })
              },
              {}),
          filteredChoices: choices
        } as any
  },
  {
    name: 'Table',
    instance:
        createFieldInstance(
            {
              node: createField({
                id: 1,
                name: 'table_field',
                parent: 0,
                parentNode: 0,
                fieldType: AjfFieldType.Table
              })
            },
            {}),
  }
];
