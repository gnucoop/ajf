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

import {AjfChoicesOrigin} from '@ajf/core/forms';
import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {AjfFbChoicesOriginEditor} from './choices-origin-editor';
import {AjfFormBuilderService} from './form-builder-service';

@Component({
  selector: 'ajf-fb-choices-origin-editor-dialog',
  templateUrl: 'choices-origin-editor-dialog.html',
  styleUrls: ['choices-origin-editor-dialog.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfFbChoicesOriginEditorDialog {
  @ViewChild(AjfFbChoicesOriginEditor, {static: false}) editor!: AjfFbChoicesOriginEditor;

  private _choicesOrigin: Observable<AjfChoicesOrigin<any>>;
  get choicesOrigin(): Observable<AjfChoicesOrigin<any>> {
    return this._choicesOrigin;
  }

  private _allChoicesOrigins: AjfChoicesOrigin<any>[] = [];
  private _editedOriginOriginalName = '';

  constructor(private _service: AjfFormBuilderService) {
    this._choicesOrigin = this._service.editedChoicesOrigin.pipe(
      filter(c => c != null),
      map(c => c!),
    );
    this._service.editedChoicesOrigin
      .pipe(filter(c => c != null), map(c => c!))
      .subscribe(c => { this._editedOriginOriginalName = c.name; });
    this._service.choicesOrigins.subscribe(origins => {
      this._allChoicesOrigins = origins;
    });
  }

  isDuplicateName(): boolean {
    if (this.editor == null) return false;
    const name = (this.editor.name ?? '').trim();
    if (name === '') return false;
    return this._allChoicesOrigins.some(
      o => o.name !== this._editedOriginOriginalName && o.name === name,
    );
  }

  disableSave(): boolean {
    if (this.editor == null) return true;
    const name = (this.editor.name ?? '').trim();
    if (name === '') return true;
    if (this.isDuplicateName()) return true;
    if (this.editor.hasInvalidChoices) return true;
    return false;
  }

  saveChoicesOrigin(): void {
    this._service.saveChoicesOrigin({
      label: this.editor.label,
      name: this.editor.name,
      choices: this.editor.choicesArr,
    });
  }

  cancelChoicesOriginEdit(): void {
    this._service.cancelChoicesOriginEdit();
  }
}
