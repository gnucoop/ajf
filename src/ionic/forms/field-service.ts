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

import {
  AjfFieldService as CoreService,
  AjfFieldType,
  AjfFileFieldComponent,
  AjfImageFieldComponent,
} from '@ajf/core/forms';
import {Injectable} from '@angular/core';

import {AjfBarcodeFieldComponent} from './barcode-field';
import {AjfBooleanFieldComponent} from './boolean-field';
import {AjfDateFieldComponent} from './date-field';
import {AjfDateInputFieldComponent} from './date-input-field';
import {AjfEmptyFieldComponent} from './empty-field';
import {AjfFormulaFieldComponent} from './formula-field';
import {AjfInputFieldComponent} from './input-field';
import {AjfMultipleChoiceFieldComponent} from './multiple-choice-field';
import {AjfNumberFieldComponent} from './number-field';
import {AjfSingleChoiceFieldComponent} from './single-choice-field';
import {AjfTableFieldComponent} from './table-field';
import {AjfTextareaFieldComponent} from './textarea-field';
import {AjfTimeFieldComponent} from './time-field';
import {AjfVideoUrlFieldComponent} from './video-url-field';

@Injectable({providedIn: 'root'})
export class AjfFieldService extends CoreService {
  constructor() {
    super();
    this.componentsMap[AjfFieldType.String] = {component: AjfInputFieldComponent};
    this.componentsMap[AjfFieldType.Text] = {component: AjfTextareaFieldComponent};
    this.componentsMap[AjfFieldType.Number] = {component: AjfNumberFieldComponent};
    this.componentsMap[AjfFieldType.Boolean] = {component: AjfBooleanFieldComponent};
    this.componentsMap[AjfFieldType.Formula] = {component: AjfFormulaFieldComponent};
    this.componentsMap[AjfFieldType.Date] = {component: AjfDateFieldComponent};
    this.componentsMap[AjfFieldType.DateInput] = {component: AjfDateInputFieldComponent};
    this.componentsMap[AjfFieldType.Table] = {component: AjfTableFieldComponent};
    this.componentsMap[AjfFieldType.Empty] = {component: AjfEmptyFieldComponent};
    this.componentsMap[AjfFieldType.SingleChoice] = {component: AjfSingleChoiceFieldComponent};
    this.componentsMap[AjfFieldType.MultipleChoice] = {component: AjfMultipleChoiceFieldComponent};
    this.componentsMap[AjfFieldType.Time] = {component: AjfTimeFieldComponent};
    this.componentsMap[AjfFieldType.Barcode] = {component: AjfBarcodeFieldComponent};
    this.componentsMap[AjfFieldType.File] = {component: AjfFileFieldComponent};
    this.componentsMap[AjfFieldType.Image] = {component: AjfImageFieldComponent};
    this.componentsMap[AjfFieldType.VideoUrl] = {component: AjfVideoUrlFieldComponent};
  }
}
