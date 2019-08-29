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
  AjfFieldType, AjfFieldComponentsMap, AjfFieldHost, AjfFormField as CoreFormField
} from '@ajf/core/forms';
import {
  ChangeDetectionStrategy, Component, ComponentFactoryResolver, ViewChild, ViewEncapsulation
} from '@angular/core';

import {AjfBarcodeFieldComponent} from './barcode-field';
import {AjfBooleanFieldComponent} from './boolean-field';
import {AjfDateFieldComponent} from './date-field';
import {AjfEmptyFieldComponent} from './empty-field';
import {AjfInputFieldComponent} from './input-field';
import {AjfMultipleChoiceFieldComponent} from './multiple-choice-field';
import {AjfSingleChoiceFieldComponent} from './single-choice-field';
import {AjfTableFieldComponent} from './table-field';
import {AjfTimeFieldComponent} from './time-field';

@Component({
  moduleId: module.id,
  selector: 'ajf-field,ajf-form-field',
  templateUrl: 'field.html',
  styleUrls: ['field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  inputs: ['instance'],
  queries: {
    fieldHost: new ViewChild(AjfFieldHost, {static: true}),
  }
})
export class AjfFormField extends CoreFormField {
  componentsMap: AjfFieldComponentsMap = {
    [AjfFieldType.String]: {component: AjfInputFieldComponent},
    [AjfFieldType.Text]: {component: AjfInputFieldComponent},
    [AjfFieldType.Number]: {component: AjfInputFieldComponent, inputs: {type: 'number'}},
    [AjfFieldType.Boolean]: {component: AjfBooleanFieldComponent},
    [AjfFieldType.Formula]: {component: AjfInputFieldComponent, inputs: {readonly: true}},
    [AjfFieldType.Date]: {component: AjfDateFieldComponent},
    [AjfFieldType.DateInput]: {component: AjfInputFieldComponent, inputs: {type: 'date'}},
    [AjfFieldType.Table]: {component: AjfTableFieldComponent},
    [AjfFieldType.Empty]: {component: AjfEmptyFieldComponent},
    [AjfFieldType.SingleChoice]: {component: AjfSingleChoiceFieldComponent},
    [AjfFieldType.MultipleChoice]: {component: AjfMultipleChoiceFieldComponent},
    [AjfFieldType.Time]: {component: AjfTimeFieldComponent},
    [AjfFieldType.Barcode]: {component: AjfBarcodeFieldComponent},
  };

  constructor(cfr: ComponentFactoryResolver) {
    super(cfr);
  }

  goToNextCell(ev: KeyboardEvent, indexColumn: number, indexRow: number) {
    const rowLength = this.tablefInst.controlsWithLabels[indexRow].length;
    const currentCell: any = this.tablefInst.controlsWithLabels[indexRow][indexColumn];
    let nextCell: any = this.tablefInst.controlsWithLabels[indexRow][indexColumn + 1];

    if (indexColumn + 1 >= rowLength) {
      nextCell = this.tablefInst.controlsWithLabels[indexRow + 1][1];
    }

    currentCell.show = false;
    nextCell.show = true;
    ev.preventDefault();
    ev.stopPropagation();
  }
}
