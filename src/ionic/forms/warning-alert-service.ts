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
import {AlertController} from '@ionic/angular';
import {Observable} from 'rxjs';

@Injectable()
export class AjfWarningAlertService implements CoreWarningAlertService {
  constructor(private _alertCtrl: AlertController) { }

  showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult> {
    return new Observable<AjfFieldWarningAlertResult>(subscriber => {
      this._alertCtrl.create({
        header: 'Warning',
        message: warnings.join('\n'),
        buttons: [
          {
            text: 'No',
            handler: () => {
              subscriber.next(<AjfFieldWarningAlertResult>{result: false});
              subscriber.complete();
            }
          },
          {
            text: 'Yes',
            handler: () => {
              subscriber.next(<AjfFieldWarningAlertResult>{result: true});
              subscriber.complete();
            }
          }
        ]
      }).then((alert) => {
        alert.present();
      });
    });
  }
}
