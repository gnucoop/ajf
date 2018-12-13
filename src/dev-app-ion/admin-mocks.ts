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

import {Observable, of as obsOf, Subject} from 'rxjs';

export class AdminModel {
  foo: string;
  bar: string;
  baz: number;
}

const demoObj: AdminModel = {
  foo: 'demo foo',
  bar: 'demo bar',
  baz: 2
};

export class AdminModelMockService {
  private _subject: Subject<AdminModel> = new Subject<AdminModel>();

  get(_id: number): void {}

  getGetObject(): Observable<AdminModel> {
    return obsOf(demoObj);
  }

  getCreateSuccess(): Observable<AdminModel | null> {
    return this._subject.asObservable();
  }

  getPatchSuccess(): Observable<AdminModel | null> {
    return this._subject.asObservable();
  }
}
