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

import {
  AjfFieldWarningAlertResult, AjfWarningAlertService as CoreWarningAlertService
} from '@ajf/core/forms';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AjfFieldWarningDialog} from './field-warning-dialog';

@Injectable()
export class AjfWarningAlertService implements CoreWarningAlertService {
  constructor(private _dialog: MatDialog) { }

  showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult> {
    const dialog = this._dialog.open(AjfFieldWarningDialog);
    dialog.componentInstance.message = warnings.join('<br>');
    return dialog.afterClosed().pipe(
      map((result: boolean) => ({result}))
    );
  }
}
