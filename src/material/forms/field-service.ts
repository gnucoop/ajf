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

import {
  AjfFieldService as CoreService,
  AjfFieldType,
  AjfReadOnlyFieldComponent,
  AjfReadOnlyTableFieldComponent
} from '@ajf/core/forms';
import {Injectable} from '@angular/core';

import {AjfBarcodeFieldComponent} from './barcode-field';
import {AjfBooleanFieldComponent} from './boolean-field';
import {AjfDateFieldComponent} from './date-field';
import {AjfDateInputFieldComponent} from './date-input-field';
import {AjfEmptyFieldComponent} from './empty-field';
import {AjfInputFieldComponent} from './input-field';
import {AjfMultipleChoiceFieldComponent} from './multiple-choice-field';
import {AjfSingleChoiceFieldComponent} from './single-choice-field';
import {AjfTableFieldComponent} from './table-field';
import {AjfTimeFieldComponent} from './time-field';

@Injectable({providedIn: 'root'})
export class AjfFieldService extends CoreService {
  constructor() {
    super();
    this.componentsMap[AjfFieldType.String] = {
      component: AjfInputFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    },
    this.componentsMap[AjfFieldType.Text] = {
      component: AjfInputFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    },
    this.componentsMap[AjfFieldType.Number] = {
      component: AjfInputFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent,
      inputs: {type: 'number'}
    },
    this.componentsMap[AjfFieldType.Boolean] = {
      component: AjfBooleanFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    },
    this.componentsMap[AjfFieldType.Formula] = {
      component: AjfInputFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent,
      inputs: {readonly: true}
    },
    this.componentsMap[AjfFieldType.Date] = {
      component: AjfDateFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    },
    this.componentsMap[AjfFieldType.DateInput] = {
      component: AjfDateInputFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    },
    this.componentsMap[AjfFieldType.Table] = {
      component: AjfTableFieldComponent,
      readOnlyComponent: AjfReadOnlyTableFieldComponent
    },
    this.componentsMap[AjfFieldType.Empty] = {component: AjfEmptyFieldComponent},
    this.componentsMap[AjfFieldType.SingleChoice] = {
      component: AjfSingleChoiceFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    },
    this.componentsMap[AjfFieldType.MultipleChoice] = {
      component: AjfMultipleChoiceFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    },
    this.componentsMap[AjfFieldType.Time] = {
      component: AjfTimeFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    },
    this.componentsMap[AjfFieldType.Barcode] = {
      component: AjfBarcodeFieldComponent,
      readOnlyComponent: AjfReadOnlyFieldComponent
    };
  }
}
