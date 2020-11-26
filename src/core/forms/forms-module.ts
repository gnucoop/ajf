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

import {AjfCommonModule} from '@ajf/core/common';
import {AjfFileInputModule} from '@ajf/core/file-input';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import {AjfAsFieldInstancePipe} from './as-field-instance';
import {AjfAsRepeatingSlideInstancePipe} from './as-repeating-slide-instance';
import {AjfBoolToIntPipe} from './bool-to-int';
import {AjfDateValuePipe} from './date-value';
import {AjfDateValueStringPipe} from './date-value-string';
import {AjfExpandFieldWithChoicesPipe} from './expand-input-with-choices';
import {AjfFieldHost} from './field-host';
import {AjfFieldIconPipe} from './field-icon';
import {AjfFieldIsValidPipe} from './field-is-valid';
import {AjfFileFieldComponent} from './file-field';
import {AjfFormRendererService} from './form-renderer';
import {AjfGetTableCellControlPipe} from './get-table-cell-control';
import {AjfImageFieldComponent} from './image-field';
import {AjfIncrementPipe} from './increment';
import {AjfIsCellEditablePipe} from './is-cell-editable';
import {AjfIsRepeatingSlideInstancePipe} from './is-repeating-slide';
import {AjfNodeCompleteNamePipe} from './node-complete-name';
import {AjfRangePipe} from './range';
import {AjfReadOnlyFieldComponent} from './read-only-field';
import {AjfReadOnlyFileFieldComponent} from './read-only-file-field';
import {AjfReadOnlyImageFieldComponent} from './read-only-image-field';
import {AjfReadOnlySelectFieldComponent} from './read-only-select-field';
import {AjfReadOnlyTableFieldComponent} from './read-only-table-field';
import {AjfReadOnlyVideoUrlFieldComponent} from './read-only-video-url-field';
import {AjfTableRowClass} from './table-row-class';
import {AjfTableVisibleColumnsPipe} from './table-visible-columns';
import {AjfValidSlidePipe} from './valid-slide';
import {AjfValidationService} from './validation-service';

@NgModule({
  declarations: [
    AjfAsFieldInstancePipe,
    AjfAsRepeatingSlideInstancePipe,
    AjfBoolToIntPipe,
    AjfDateValuePipe,
    AjfDateValueStringPipe,
    AjfExpandFieldWithChoicesPipe,
    AjfFieldHost,
    AjfFieldIconPipe,
    AjfFieldIsValidPipe,
    AjfFileFieldComponent,
    AjfGetTableCellControlPipe,
    AjfImageFieldComponent,
    AjfIncrementPipe,
    AjfIsCellEditablePipe,
    AjfIsRepeatingSlideInstancePipe,
    AjfNodeCompleteNamePipe,
    AjfRangePipe,
    AjfReadOnlyFieldComponent,
    AjfReadOnlyFileFieldComponent,
    AjfReadOnlyImageFieldComponent,
    AjfReadOnlySelectFieldComponent,
    AjfReadOnlyTableFieldComponent,
    AjfReadOnlyVideoUrlFieldComponent,
    AjfTableRowClass,
    AjfTableVisibleColumnsPipe,
    AjfValidSlidePipe,
  ],
  imports: [
    AjfCommonModule, AjfFileInputModule, CommonModule, HttpClientModule, ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    AjfAsFieldInstancePipe,
    AjfAsRepeatingSlideInstancePipe,
    AjfBoolToIntPipe,
    AjfDateValuePipe,
    AjfDateValueStringPipe,
    AjfExpandFieldWithChoicesPipe,
    AjfFieldHost,
    AjfFieldIconPipe,
    AjfFieldIsValidPipe,
    AjfFileFieldComponent,
    AjfGetTableCellControlPipe,
    AjfImageFieldComponent,
    AjfIncrementPipe,
    AjfIsCellEditablePipe,
    AjfIsRepeatingSlideInstancePipe,
    AjfNodeCompleteNamePipe,
    AjfRangePipe,
    AjfReadOnlyFieldComponent,
    AjfReadOnlyFileFieldComponent,
    AjfReadOnlyImageFieldComponent,
    AjfReadOnlySelectFieldComponent,
    AjfReadOnlyTableFieldComponent,
    AjfReadOnlyVideoUrlFieldComponent,
    AjfTableRowClass,
    AjfTableVisibleColumnsPipe,
    AjfValidSlidePipe,
  ],
  entryComponents: [
    AjfFileFieldComponent,
    AjfImageFieldComponent,
    AjfReadOnlyFieldComponent,
    AjfReadOnlyFileFieldComponent,
    AjfReadOnlyImageFieldComponent,
    AjfReadOnlySelectFieldComponent,
    AjfReadOnlyTableFieldComponent,
    AjfReadOnlyVideoUrlFieldComponent,
  ],
  providers: [
    AjfDateValueStringPipe,
    AjfFormRendererService,
    AjfValidationService,
  ],
})
export class AjfFormsModule {
}
