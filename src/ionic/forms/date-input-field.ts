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

import {AjfDateFieldInstance, AjfDateValueStringPipe, AjfBaseFieldComponent,
    AjfFormRendererService} from '@ajf/core/forms';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild,
    ViewEncapsulation} from '@angular/core';
import {IonInput} from '@ionic/angular';

import {AjfWarningAlertService} from './warning-alert-service';

@Component({
  moduleId: module.id,
  templateUrl: 'date-input-field.html',
  styleUrls: ['date-input-field.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfDateInputFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
  @ViewChild(IonInput, {static: true}) input: IonInput;

  private _minDateStr: string | undefined;
  private _maxDateStr: string | undefined;

  constructor(
      cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService,
      private _dvs: AjfDateValueStringPipe) {
    super(cdr, service, was);
  }

  onChange(evt: {detail: {value: string}}): void {
    if (this.input == null) { return; }
    const val = evt.detail.value || '';
    if (val.length > 0) {
      if (
        (this._minDateStr != null && val < this._minDateStr)
        || (this._maxDateStr != null && val > this._maxDateStr)
      ) {
        this.input.value = '';
      }
    }
  }

  protected _onInstanceChange(): void {
    this._minDateStr = this._dvs.transform(this.instance.node.minDate);
    this._maxDateStr = this._dvs.transform(this.instance.node.maxDate);
  }
}
