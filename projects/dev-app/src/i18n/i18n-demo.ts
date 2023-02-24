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

import {TranslocoService} from '@ajf/core/transloco';
import {Component} from '@angular/core';

@Component({
  selector: 'i18n-demo',
  templateUrl: 'i18n-demo.html',
  styleUrls: ['i18n-demo.scss'],
})
export class I18nDemo {
  readonly langs: string[];
  constructor(private _ts: TranslocoService) {
    this.langs = _ts.getAvailableLangs() as string[];
    this._ts.setTranslation({'hello': 'hello world!'}, 'ENG');
    this._ts.setTranslation({'hello': 'ciao mondo!'}, 'ITA');
    this._ts.setTranslation({'hello': 'hola mundo!'}, 'ESP');
    this._ts.setTranslation({'hello': 'Bonjour le monde!'}, 'FRA');
    this._ts.setTranslation({'hello': 'ሰላም ልዑል!'}, 'ETH');
    this._ts.setTranslation({'hello': 'привіт світ!'}, 'UKR');
  }

  changeLang(lang: string): void {
    this._ts.setActiveLang(lang);
  }
}
