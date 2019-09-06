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

import {AjfBoolToIntPipe} from './bool-to-int';
import {AjfDateValuePipe} from './date-value';
import {AjfDateValueStringPipe} from './date-value-string';
import {AjfExpandFieldWithChoicesPipe} from './expand-input-with-choices';
import {AjfFieldHost} from './field-host';
import {AjfFieldIconPipe} from './field-icon';
import {AjfFieldIsValidPipe} from './field-is-valid';
import {AjfFormRendererService} from './form-renderer';
import {AjfIncrementPipe} from './increment';
import {AjfIsRepeatingSlideInstancePipe} from './is-repeating-slide';
import {AjfNodeCompleteNamePipe} from './node-complete-name';
import {AjfRangePipe} from './range';
import {AjfTableRowClass} from './table-row-class';
import {AjfTableVisibleColumnsPipe} from './table-visible-columns';
import {AjfValidationService} from './validation-service';
import {AjfValidSlidePipe} from './valid-slide';

@NgModule({
  declarations: [
    AjfBoolToIntPipe,
    AjfDateValuePipe,
    AjfDateValueStringPipe,
    AjfExpandFieldWithChoicesPipe,
    AjfFieldHost,
    AjfFieldIconPipe,
    AjfFieldIsValidPipe,
    AjfIncrementPipe,
    AjfIsRepeatingSlideInstancePipe,
    AjfNodeCompleteNamePipe,
    AjfRangePipe,
    AjfTableRowClass,
    AjfTableVisibleColumnsPipe,
    AjfValidSlidePipe,
  ],
  exports: [
    AjfBoolToIntPipe,
    AjfDateValuePipe,
    AjfDateValueStringPipe,
    AjfExpandFieldWithChoicesPipe,
    AjfFieldHost,
    AjfFieldIconPipe,
    AjfFieldIsValidPipe,
    AjfIncrementPipe,
    AjfIsRepeatingSlideInstancePipe,
    AjfNodeCompleteNamePipe,
    AjfRangePipe,
    AjfTableRowClass,
    AjfTableVisibleColumnsPipe,
    AjfValidSlidePipe,
  ],
  providers: [AjfDateValueStringPipe, AjfFormRendererService, AjfValidationService]
})
export class AjfFormsModule {
}
