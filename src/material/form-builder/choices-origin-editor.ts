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

import {AjfChoicesOrigin, isChoicesFixedOrigin} from '@ajf/core/forms';
import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

import {ChoicesOriginChoiceEntry, ChoicesOriginDataSource} from './choices-origin-data-source';


@Component({
  selector: 'ajf-fb-choices-origin-editor',
  templateUrl: 'choices-origin-editor.html',
  styleUrls: ['choices-origin-editor.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfFbChoicesOriginEditor {
  private _displayedColumns: string[] = ['label', 'value', 'delete'];
  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  private _choicesOrigin: AjfChoicesOrigin<any>;
  get choicesOrigin(): AjfChoicesOrigin<any> {
    return this._choicesOrigin;
  }
  @Input()
  set choicesOrigin(choicesOrigin: AjfChoicesOrigin<any>) {
    this._choicesOrigin = choicesOrigin;
    this.name = choicesOrigin.name;
    this.label = choicesOrigin.label;

    this.canEditChoices = isChoicesFixedOrigin(choicesOrigin);
    this._choicesArr = choicesOrigin.choices;
    this._choices.updateChoices(this._choicesArr);
  }

  editing: {[key: string]: boolean} = {};
  name: string;
  label: string;
  canEditChoices: boolean;

  private _choices: ChoicesOriginDataSource = new ChoicesOriginDataSource();
  get choices(): ChoicesOriginDataSource {
    return this._choices;
  }

  private _choicesArr: ChoicesOriginChoiceEntry[] = [];
  get choicesArr(): ChoicesOriginChoiceEntry[] {
    return this._choicesArr;
  }

  updateValue(evt: any, cell: string, _value: any, rowIdx: number): void {
    this.editing[rowIdx + '-' + cell] = false;
    (this._choicesArr[rowIdx] as any)[cell] = evt.target.value;
    this._choices.updateChoices(this._choicesArr);
  }

  deleteRow(rowIdx: number): void {
    this._choicesArr.splice(rowIdx, 1);
    this._choices.updateChoices(this._choicesArr);
  }

  addRow(): void {
    this._choicesArr.push({label: '', value: ''});
    this._choices.updateChoices(this._choicesArr);
  }
}
