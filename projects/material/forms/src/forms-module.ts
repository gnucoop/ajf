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
import {AjfBarcodeModule} from '@ajf/material/barcode';
import {AjfAudioModule} from '@ajf/material/audio';
import {AjfCalendarModule} from '@ajf/material/calendar';
import {AjfCheckboxGroupModule} from '@ajf/material/checkbox-group';
import {AjfGeolocationModule} from '@ajf/material/geolocation';
import {AjfPageSliderModule} from '@ajf/material/page-slider';
import {AjfTimeModule} from '@ajf/material/time';
import {TextFieldModule} from '@angular/cdk/text-field';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import {AjfAudioFieldComponent} from './audio-field';
import {AjfBarcodeFieldComponent} from './barcode-field';
import {AjfBooleanFieldComponent} from './boolean-field';
import {AjfDateFieldComponent} from './date-field';
import {AjfDateInputFieldComponent} from './date-input-field';
import {AjfEmptyFieldComponent} from './empty-field';
import {AjfFormField} from './field';
import {AjfFieldService} from './field-service';
import {AjfFieldWarningDialog} from './field-warning-dialog';
import {AjfFormRenderer} from './form';
import {AjfGeolocationFieldComponent} from './geolocation-field';
import {AjfInputFieldComponent} from './input-field';
import {AjfMultipleChoiceFieldComponent} from './multiple-choice-field';
import {AjfRangeFieldComponent} from './range-field';
import {AjfSignatureFieldComponent} from './signature-field';
import {AjfSingleChoiceFieldComponent} from './single-choice-field';
import {AjfTableFieldComponent} from './table-field';
import {AjfTextFieldComponent} from './text-field';
import {AjfTimeFieldComponent} from './time-field';
import {AjfVideoUrlFieldComponent} from './video-url-field';
import {AjfWarningAlertService} from './warning-alert-service';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {AjfSignatureModule} from '@ajf/material/signature';

@NgModule({
  imports: [
    AjfAudioModule,
    AjfBarcodeModule,
    AjfCalendarModule,
    AjfCommonModule,
    AjfCheckboxGroupModule,
    AjfGeolocationModule,
    AjfPageSliderModule,
    AjfSignatureModule,
    AjfTimeModule,
    AjfTranslocoModule,
    CommonModule,
    CoreFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatSliderModule,
    NgxMatSelectSearchModule,
  ],
  declarations: [
    AjfAudioFieldComponent,
    AjfBarcodeFieldComponent,
    AjfBooleanFieldComponent,
    AjfDateFieldComponent,
    AjfDateInputFieldComponent,
    AjfEmptyFieldComponent,
    AjfFieldWarningDialog,
    AjfFormField,
    AjfFormRenderer,
    AjfGeolocationFieldComponent,
    AjfInputFieldComponent,
    AjfMultipleChoiceFieldComponent,
    AjfRangeFieldComponent,
    AjfSignatureFieldComponent,
    AjfSingleChoiceFieldComponent,
    AjfTableFieldComponent,
    AjfTextFieldComponent,
    AjfTimeFieldComponent,
    AjfVideoUrlFieldComponent,
  ],
  exports: [AjfFormField, AjfFormRenderer],
  providers: [
    AjfFieldService,
    {provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService},
  ],
})
export class AjfFormsModule {
  static forRoot(): ModuleWithProviders<AjfFormsModule> {
    return {
      ngModule: AjfFormsModule,
      providers: [AjfFieldService],
    };
  }
}
