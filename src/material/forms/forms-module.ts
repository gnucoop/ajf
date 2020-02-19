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

import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';

import {TranslateModule} from '@ngx-translate/core';

import {AjfFormsModule as AjfCoreFormsModule} from '@ajf/core/forms';
import {AjfCommonModule} from '@ajf/core/common';
import {AjfBarcodeModule} from '@ajf/material/barcode';
import {AjfCalendarModule} from '@ajf/material/calendar';
import {AjfCheckboxGroupModule} from '@ajf/material/checkbox-group';
import {AjfPageSliderModule} from '@ajf/material/page-slider';
import {AjfTimeModule} from '@ajf/material/time';

import {AjfBarcodeFieldComponent} from './barcode-field';
import {AjfBooleanFieldComponent} from './boolean-field';
import {AjfDateFieldComponent} from './date-field';
import {AjfDateInputFieldComponent} from './date-input-field';
import {AjfEmptyFieldComponent} from './empty-field';
import {AjfFormField} from './field';
import {AjfFieldService} from './field-service';
import {AjfFieldWarningDialog} from './field-warning-dialog';
import {AjfFormRenderer} from './form';
import {AjfGetTableCellControlPipe} from './get-table-cell-control';
import {AjfInputFieldComponent} from './input-field';
import {AjfIsCellEditablePipe} from './is-cell-editable';
import {AjfMultipleChoiceFieldComponent} from './multiple-choice-field';
import {AjfSingleChoiceFieldComponent} from './single-choice-field';
import {AjfTableFieldComponent} from './table-field';
import {AjfTimeFieldComponent} from './time-field';
import {AjfWarningAlertService} from './warning-alert-service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    TranslateModule,
    AjfCoreFormsModule,
    AjfCalendarModule,
    AjfBarcodeModule,
    AjfCheckboxGroupModule,
    AjfCommonModule,
    AjfPageSliderModule,
    AjfTimeModule
  ],
  declarations: [
    AjfBarcodeFieldComponent,
    AjfBooleanFieldComponent,
    AjfDateFieldComponent,
    AjfDateInputFieldComponent,
    AjfEmptyFieldComponent,
    AjfFieldWarningDialog,
    AjfFormField,
    AjfFormRenderer,
    AjfGetTableCellControlPipe,
    AjfInputFieldComponent,
    AjfIsCellEditablePipe,
    AjfMultipleChoiceFieldComponent,
    AjfSingleChoiceFieldComponent,
    AjfTableFieldComponent,
    AjfTimeFieldComponent
  ],
  entryComponents: [
    AjfBarcodeFieldComponent,
    AjfBooleanFieldComponent,
    AjfDateFieldComponent,
    AjfDateInputFieldComponent,
    AjfEmptyFieldComponent,
    AjfInputFieldComponent,
    AjfMultipleChoiceFieldComponent,
    AjfSingleChoiceFieldComponent,
    AjfTableFieldComponent,
    AjfTimeFieldComponent
  ],
  exports: [
    AjfFormField,
    AjfFormRenderer
  ],
  providers: [
    AjfFieldService,
    AjfWarningAlertService,
  ],
})
export class AjfFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AjfFormsModule,
      providers: [
        AjfFieldService,
      ],
    };
  }
}
