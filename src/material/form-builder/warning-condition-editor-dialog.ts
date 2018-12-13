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

import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AjfField} from '@ajf/core/forms';

import {AjfFbConditionEditor} from './condition-editor';
import {AjfFormBuilderService} from './form-builder-service';


@Component({
  moduleId: module.id,
  selector: 'ajf-fb-warning-condition-editor-dialog',
  templateUrl: 'warning-condition-editor-dialog.html',
  styleUrls: ['warning-condition-editor-dialog.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfFbWarningConditionEditorDialog {
  @ViewChild(AjfFbConditionEditor) editor: AjfFbConditionEditor;

  private _fields: Observable<AjfField[]>;
  get fields(): Observable<AjfField[]> { return this._fields; }

  condition: string;
  warningMessage: string;

  constructor(
    service: AjfFormBuilderService,
    public dialogRef: MatDialogRef<AjfFbWarningConditionEditorDialog>
  ) {
    this._fields = service.flatFields.pipe(
      map((fields: AjfField[]) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name)))
    );
  }

  saveCondition(): void {
    if (this.editor == null) { return; }
    const newValue = this.editor.editedValue;
    this.dialogRef.close({condition: newValue, warningMessage: this.warningMessage});
  }
}
