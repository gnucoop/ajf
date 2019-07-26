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
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnDestroy, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {
  AjfFormField as AjfCoreFormField, AjfFormFieldWarningAlertResult, AjfFormRendererService
} from '@ajf/core/forms';

import {AjfFormFieldWarningDialog} from './field-warning-dialog';


@Component({
  moduleId: module.id,
  selector: 'ajf-form-field',
  templateUrl: 'field.html',
  styleUrls: ['field.css'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
    'fieldInstance'
  ],
  outputs: [
    'valueChanged'
  ],
  queries: {
    singleChoiceSelect: new ViewChild('singleChoiceSelect', {static: false}),
    multipleChoiceSelect: new ViewChild('multipleChoiceSelect', {static: false})
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfFormField extends AjfCoreFormField implements OnDestroy, OnInit {
  constructor(
    _rendererService: AjfFormRendererService,
    _changeDetectionRef: ChangeDetectorRef,
    private _dialog: MatDialog
  ) {
    super(_rendererService, _changeDetectionRef);
  }

  showWarningAlertPrompt(messagesWarning: string[]): Observable<AjfFormFieldWarningAlertResult> {
    const dialog = this._dialog.open(AjfFormFieldWarningDialog);
    dialog.componentInstance.message = messagesWarning.join('<br>');
    return dialog.afterClosed().pipe(
      map((result: boolean) => ({result}))
    );
  }
}
