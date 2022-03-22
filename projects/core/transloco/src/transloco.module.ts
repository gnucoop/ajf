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

import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_MISSING_HANDLER,
  translocoConfig,
  TranslocoConfig,
  TranslocoModule,
  TranslocoService,
  TRANSLOCO_TRANSPILER,
  FunctionalTranspiler,
} from '@ngneat/transloco';

import {langs} from './lang';
import {MissingHandler} from './transloco-missing-handler';

const availableLangs = ['ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'ETH'];

@NgModule({
  imports: [TranslocoModule],
  exports: [TranslocoModule],
  providers: [
    {provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler},
    {
      provide: TRANSLOCO_TRANSPILER,
      useClass: FunctionalTranspiler,
    },
  ],
})
export class AjfTranslocoModule {
  constructor(ts: TranslocoService) {
    availableLangs.forEach(lang => {
      if (langs[lang] != null) {
        ts.setTranslation(langs[lang], lang);
      }
    });
  }

  static forRoot(
    config?: Partial<TranslocoConfig> | undefined,
  ): ModuleWithProviders<AjfTranslocoModule> {
    return {
      ngModule: AjfTranslocoModule,
      providers: [
        TranslocoService,
        {
          provide: TRANSLOCO_CONFIG,
          useValue: translocoConfig({
            ...config,
            availableLangs,
            defaultLang: 'ENG',
          }),
        },
      ],
    };
  }
}
