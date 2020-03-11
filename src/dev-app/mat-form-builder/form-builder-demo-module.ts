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

import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AjfFormBuilderModule} from '@ajf/material/form-builder';

import {FormBuilderDemo} from './form-builder-demo';

@NgModule({
  imports: [
    AjfFormBuilderModule,
    FormsModule,
    MatExpansionModule,
    RouterModule.forChild([{path: '', component: FormBuilderDemo}]),
  ],
  declarations: [
    FormBuilderDemo,
  ],
})
export class FormBuilderDemoModule {
}
