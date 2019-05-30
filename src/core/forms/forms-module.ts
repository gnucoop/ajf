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

import {NgModule} from '@angular/core';

import {BoolToIntPipe} from './bool-to-int';
import {FieldIconPipe} from './field-icon';
import {AjfFieldIsValidPipe} from './field-is-valid';
import {AjfFormRendererService} from './form-renderer';
import {TableRowClass} from './table-row-class';
import {AjfValidationService} from './validation-service';


@NgModule({
  declarations: [
    AjfFieldIsValidPipe,
    BoolToIntPipe,
    FieldIconPipe,
    TableRowClass,
  ],
  exports: [
    AjfFieldIsValidPipe,
    BoolToIntPipe,
    FieldIconPipe,
    TableRowClass,
  ],
  providers: [
    AjfFormRendererService,
    AjfValidationService
  ]
})
export class AjfFormsModule { }
