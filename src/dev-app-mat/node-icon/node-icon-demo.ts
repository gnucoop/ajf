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

import {AjfField, AjfFieldType, createField} from '@ajf/core/forms';
import {Component} from '@angular/core';

const baseField = {
  id: 1,
  name: '',
  parent: 0
};

@Component({
  moduleId: module.id,
  selector: 'node-icon-demo',
  templateUrl: 'node-icon-demo.html',
  styleUrls: ['node-icon-demo.css'],
})
export class NodeIconDemo {
  nodes: {name: string, node: AjfField}[] = [
    {name: 'Boolean field', node: createField({...baseField, fieldType: AjfFieldType.Boolean})},
    {name: 'Date field', node: createField({...baseField, fieldType: AjfFieldType.Date})},
    {
      name: 'Date input field',
      node: createField({...baseField, fieldType: AjfFieldType.DateInput})
    },
    {name: 'Formula field', node: createField({...baseField, fieldType: AjfFieldType.Formula})},
    {
      name: 'Multiple choice field',
      node: createField({...baseField, fieldType: AjfFieldType.MultipleChoice})
    },
    {name: 'Number field', node: createField({...baseField, fieldType: AjfFieldType.Number})},
    {
      name: 'Single choice field',
      node: createField({...baseField, fieldType: AjfFieldType.SingleChoice})
    },
    {name: 'String field', node: createField({...baseField, fieldType: AjfFieldType.String})},
    {name: 'Table field', node: createField({...baseField, fieldType: AjfFieldType.Table})},
    {name: 'Text field', node: createField({...baseField, fieldType: AjfFieldType.Text})},
    {name: 'Time field', node: createField({...baseField, fieldType: AjfFieldType.Time})},
  ];
}
