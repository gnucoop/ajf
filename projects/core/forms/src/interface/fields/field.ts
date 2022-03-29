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

import {AjfBarcodeField} from './barcode-field';
import {AjfBooleanField} from './boolean-field';
import {AjfDateField} from './date-field';
import {AjfDateInputField} from './date-input-field';
import {AjfEmptyField} from './empty-field';
import {AjfFileField} from './file-field';
import {AjfFieldWithChoices} from './field-with-choices';
import {AjfFormulaField} from './formula-field';
import {AjfImageField} from './image-field';
import {AjfMultipleChoiceField} from './multiple-choice-field';
import {AjfNumberField} from './number-field';
import {AjfRangeField} from './range-field';
import {AjfSingleChoiceField} from './single-choice-field';
import {AjfStringField} from './string-field';
import {AjfTableField} from './table-field';
import {AjfTextField} from './text-field';
import {AjfTimeField} from './time-field';

export type AjfField<T = any> =
  | AjfBarcodeField
  | AjfBooleanField
  | AjfDateField
  | AjfDateInputField
  | AjfEmptyField
  | AjfFieldWithChoices<T>
  | AjfFileField
  | AjfFormulaField
  | AjfImageField
  | AjfMultipleChoiceField<T>
  | AjfNumberField
  | AjfRangeField
  | AjfSingleChoiceField<T>
  | AjfStringField
  | AjfTableField
  | AjfTextField
  | AjfTimeField;
