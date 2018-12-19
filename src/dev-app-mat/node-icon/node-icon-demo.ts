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

import {Component} from '@angular/core';

import {
  AjfBooleanField,
  AjfDateField,
  AjfDateInputField,
  AjfFormulaField,
  AjfNode,
  AjfMultipleChoiceField,
  AjfNumberField,
  AjfSingleChoiceField,
  AjfStringField,
  AjfTableField,
  AjfTextField,
  AjfTimeField,
} from '@ajf/core/forms';

@Component({
  moduleId: module.id,
  selector: 'node-icon-demo',
  templateUrl: 'node-icon-demo.html',
  styleUrls: ['node-icon-demo.css'],
})
export class NodeIconDemo {
  nodes: {name: string, node: AjfNode}[] = [
    {name: 'Boolean field', node: new AjfBooleanField()},
    {name: 'Date field', node: new AjfDateField()},
    {name: 'Date input field', node: new AjfDateInputField()},
    {name: 'Formula field', node: new AjfFormulaField()},
    {name: 'Multiple choice field', node: new AjfMultipleChoiceField()},
    {name: 'Number field', node: new AjfNumberField()},
    {name: 'Single choice field', node: new AjfSingleChoiceField()},
    {name: 'String field', node: new AjfStringField()},
    {name: 'Table field', node: new AjfTableField()},
    {name: 'Text field', node: new AjfTextField()},
    {name: 'Time field', node: new AjfTimeField()},
  ];
}
