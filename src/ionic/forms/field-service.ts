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

import {AjfFieldComponentsMap, AjfFieldService as CoreService,
  AjfFieldType} from '@ajf/core/forms';
import {Injectable} from '@angular/core';

import {AjfBarcodeFieldComponent} from './barcode-field';
import {AjfBooleanFieldComponent} from './boolean-field';
import {AjfDateFieldComponent} from './date-field';
import {AjfDateInputFieldComponent} from './date-input-field';
import {AjfEmptyFieldComponent} from './empty-field';
import {AjfInputFieldComponent} from './input-field';
import {AjfMultipleChoiceFieldComponent} from './multiple-choice-field';
import {AjfNumberFieldComponent} from './number-field';
import {AjfSingleChoiceFieldComponent} from './single-choice-field';
import {AjfTableFieldComponent} from './table-field';
import {AjfTextareaFieldComponent} from './textarea-field';
import {AjfTimeFieldComponent} from './time-field';

@Injectable({providedIn: 'root'})
export class AjfFieldService extends CoreService {
  readonly componentsMap: AjfFieldComponentsMap = {
    [AjfFieldType.String]: {component: AjfInputFieldComponent},
    [AjfFieldType.Text]: {component: AjfTextareaFieldComponent},
    [AjfFieldType.Number]: {component: AjfNumberFieldComponent},
    [AjfFieldType.Boolean]: {component: AjfBooleanFieldComponent},
    [AjfFieldType.Formula]: {component: AjfInputFieldComponent, inputs: {readonly: true}},
    [AjfFieldType.Date]: {component: AjfDateFieldComponent},
    [AjfFieldType.DateInput]: {component: AjfDateInputFieldComponent},
    [AjfFieldType.Table]: {component: AjfTableFieldComponent},
    [AjfFieldType.Empty]: {component: AjfEmptyFieldComponent},
    [AjfFieldType.SingleChoice]: {component: AjfSingleChoiceFieldComponent},
    [AjfFieldType.MultipleChoice]: {component: AjfMultipleChoiceFieldComponent},
    [AjfFieldType.Time]: {component: AjfTimeFieldComponent},
    [AjfFieldType.Barcode]: {component: AjfBarcodeFieldComponent},
  };
}
