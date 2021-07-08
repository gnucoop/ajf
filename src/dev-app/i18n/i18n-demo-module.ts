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

import {AjfTranslocoModule, HashMap, TranslocoPipe as CoreTranslocoPipe} from '@ajf/core/transloco';
import {AjfFormBuilderModule} from '@ajf/material/form-builder';
import {CommonModule} from '@angular/common';
import {NgModule, Pipe} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';

import {I18nDemo} from './i18n-demo';

@Pipe({name: 'transloco', pure: false})
export class TranslocoPipe extends CoreTranslocoPipe {
  transform(key: string|null, params?: HashMap|undefined, inlineLang?: string|undefined) {
    return super.transform(`demo.${key}`, params, inlineLang);
  }
}

@NgModule({
  declarations: [I18nDemo, TranslocoPipe],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    AjfFormBuilderModule,
    RouterModule.forChild([{path: '', component: I18nDemo}]),
    AjfTranslocoModule,
  ],
})
export class I18nDemoModule {
}
