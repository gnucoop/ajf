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

import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {IAjfChoicesOrigin} from '@ajf/core/forms';

import {AjfFbChoicesOriginEditor} from './choices-origin-editor';
import {AjfFormBuilderService} from './form-builder-service';


@Component({
  moduleId: module.id,
  selector: 'ajf-fb-choices-origin-editor-dialog',
  templateUrl: 'choices-origin-editor-dialog.html',
  styleUrls: ['choices-origin-editor-dialog.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfFbChoicesOriginEditorDialog {
  @ViewChild(AjfFbChoicesOriginEditor, {static: true}) editor: AjfFbChoicesOriginEditor;

  private _choicesOrigin: Observable<IAjfChoicesOrigin>;
  get choicesOrigin(): Observable<IAjfChoicesOrigin> { return this._choicesOrigin; }

  constructor(private _service: AjfFormBuilderService) {
    this._choicesOrigin = this._service.editedChoicesOrigin.pipe(
      filter(c => c != null),
      map(c => c!)
    );
  }

  saveChoicesOrigin(): void {
    this._service.saveChoicesOrigin({
      label: this.editor.label,
      name: this.editor.name,
      choices: this.editor.choicesArr
    });
  }

  cancelChoicesOriginEdit(): void {
    this._service.cancelChoicesOriginEdit();
  }
}
