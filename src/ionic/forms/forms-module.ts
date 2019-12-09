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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {GicModule} from '@gic/angular';

import {TranslateModule} from '@ngx-translate/core';

import {AjfCommonModule} from '@ajf/core/common';
import {AjfFormsModule as AjfCoreFormsModule} from '@ajf/core/forms';
import {AjfTimeModule} from '@ajf/core/time';
import {AjfBarcodeModule} from '@ajf/ionic/barcode';
import {AjfCalendarModule} from '@ajf/ionic/calendar';
import {AjfCheckboxGroupModule} from '@ajf/ionic/checkbox-group';
import {AjfPageSliderModule} from '@ajf/ionic/page-slider';

import {AjfBarcodeFieldComponent} from './barcode-field';
import {AjfBooleanFieldComponent} from './boolean-field';
import {AjfDateFieldComponent} from './date-field';
import {AjfDateInputFieldComponent} from './date-input-field';
import {AjfEmptyFieldComponent} from './empty-field';
import {AjfFormField} from './field';
import {AjfFieldService} from './field-service';
import {AjfFormPage} from './form-page';
import {AjfFormRenderer} from './form';
import {AjfFormulaFieldComponent} from './formula-field';
import {AjfInputFieldComponent} from './input-field';
import {AjfMultipleChoiceFieldComponent} from './multiple-choice-field';
import {AjfNumberFieldComponent} from './number-field';
import {AjfSelectHasSearchBarPipe} from './select-has-search-bar.pipe';
import {AjfSelectUseVirtualScroll} from './select-use-virtual-scroll.pipe';
import {AjfSingleChoiceFieldComponent} from './single-choice-field';
import {AjfTableFieldComponent} from './table-field';
import {AjfTextareaFieldComponent} from './textarea-field';
import {AjfTimeFieldComponent} from './time-field';
import {AjfWarningAlertService} from './warning-alert-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GicModule,
    TranslateModule,
    AjfCommonModule,
    AjfCoreFormsModule,
    AjfCalendarModule,
    AjfBarcodeModule,
    AjfCheckboxGroupModule,
    AjfPageSliderModule,
    AjfTimeModule,
  ],
  declarations: [
    AjfBarcodeFieldComponent,
    AjfBooleanFieldComponent,
    AjfDateFieldComponent,
    AjfDateInputFieldComponent,
    AjfEmptyFieldComponent,
    AjfFormField,
    AjfFormPage,
    AjfFormRenderer,
    AjfFormulaFieldComponent,
    AjfInputFieldComponent,
    AjfMultipleChoiceFieldComponent,
    AjfNumberFieldComponent,
    AjfSelectHasSearchBarPipe,
    AjfSelectUseVirtualScroll,
    AjfSingleChoiceFieldComponent,
    AjfTableFieldComponent,
    AjfTextareaFieldComponent,
    AjfTimeFieldComponent
  ],
  exports: [
    AjfFormField,
    AjfFormRenderer
  ],
  entryComponents: [
    AjfBarcodeFieldComponent,
    AjfBooleanFieldComponent,
    AjfDateFieldComponent,
    AjfDateInputFieldComponent,
    AjfEmptyFieldComponent,
    AjfFormulaFieldComponent,
    AjfInputFieldComponent,
    AjfMultipleChoiceFieldComponent,
    AjfNumberFieldComponent,
    AjfSingleChoiceFieldComponent,
    AjfTableFieldComponent,
    AjfTextareaFieldComponent,
    AjfTimeFieldComponent
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
