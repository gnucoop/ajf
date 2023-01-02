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
import {AJF_WARNING_ALERT_SERVICE, AjfFormsModule as CoreFormsModule} from '@ajf/core/forms';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {AjfBarcodeModule} from '@ajf/ionic/barcode';
import {AjfCalendarModule} from '@ajf/ionic/calendar';
import {AjfCheckboxGroupModule} from '@ajf/ionic/checkbox-group';
import {AjfPageSliderModule} from '@ajf/ionic/page-slider';
import {AjfTimeModule} from '@ajf/ionic/time';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GicModule} from '@gic/angular';
import {IonicModule} from '@ionic/angular';

import {AjfBarcodeFieldComponent} from './barcode-field';
import {AjfBooleanFieldComponent} from './boolean-field';
import {AjfDateFieldComponent} from './date-field';
import {AjfDateInputFieldComponent} from './date-input-field';
import {AjfEmptyFieldComponent} from './empty-field';
import {AjfFormField} from './field';
import {AjfFieldService} from './field-service';
import {AjfFormRenderer} from './form';
import {AjfFormPage} from './form-page';
import {AjfFormulaFieldComponent} from './formula-field';
import {AjfInputFieldComponent} from './input-field';
import {AjfMultipleChoiceFieldComponent} from './multiple-choice-field';
import {AjfNumberFieldComponent} from './number-field';
import {AjfPopover} from './popover';
import {AjfRangeFieldComponent} from './range-field';
import {AjfSelectHasSearchBarPipe} from './select-has-search-bar.pipe';
import {AjfSelectUseVirtualScroll} from './select-use-virtual-scroll.pipe';
import {AjfSingleChoiceFieldComponent} from './single-choice-field';
import {AjfTableFieldComponent} from './table-field';
import {AjfTextareaFieldComponent} from './textarea-field';
import {AjfTimeFieldComponent} from './time-field';
import {AjfVideoUrlFieldComponent} from './video-url-field';
import {AjfWarningAlertService} from './warning-alert-service';

@NgModule({
    imports: [
        AjfBarcodeModule,
        AjfCalendarModule,
        AjfCheckboxGroupModule,
        AjfCommonModule,
        AjfPageSliderModule,
        AjfTimeModule,
        CommonModule,
        CoreFormsModule,
        FormsModule,
        GicModule,
        IonicModule,
        ReactiveFormsModule,
        AjfTranslocoModule,
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
        AjfPopover,
        AjfRangeFieldComponent,
        AjfSelectHasSearchBarPipe,
        AjfSelectUseVirtualScroll,
        AjfSingleChoiceFieldComponent,
        AjfTableFieldComponent,
        AjfTextareaFieldComponent,
        AjfTimeFieldComponent,
        AjfVideoUrlFieldComponent,
    ],
    exports: [AjfFormField, AjfFormRenderer],
    providers: [
        AjfFieldService,
        { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
    ]
})
export class AjfFormsModule {
  static forRoot(): ModuleWithProviders<AjfFormsModule> {
    return {
      ngModule: AjfFormsModule,
      providers: [AjfFieldService],
    };
  }
}
