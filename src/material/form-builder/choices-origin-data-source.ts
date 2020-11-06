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

import {DataSource} from '@angular/cdk/collections';

import {BehaviorSubject, Observable} from 'rxjs';


export type ChoicesOriginChoiceEntry = {
  label: string,
  value: string
};

export class ChoicesOriginDataSource extends DataSource<ChoicesOriginChoiceEntry> {
  private _choices: BehaviorSubject<ChoicesOriginChoiceEntry[]> =
      new BehaviorSubject<ChoicesOriginChoiceEntry[]>([]);
  private _choicesObs: Observable<ChoicesOriginChoiceEntry[]>;

  constructor() {
    super();
    this._choicesObs = this._choices as Observable<ChoicesOriginChoiceEntry[]>;
  }

  connect(): Observable<ChoicesOriginChoiceEntry[]> {
    return this._choicesObs;
  }

  disconnect() {}

  updateChoices(choices: ChoicesOriginChoiceEntry[]) {
    this._choices.next(choices);
  }
}
