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

import {CdkAccordionModule} from '@angular/cdk/accordion';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {DevApp404} from './dev-app-404';
import {DevAppHome} from './dev-app-home';
import {DevAppLayout} from './dev-app-layout';

@NgModule({
  imports: [
    CdkAccordionModule,
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    TranslateModule.forRoot(),
  ],
  declarations: [
    DevApp404,
    DevAppLayout,
    DevAppHome,
  ],
  exports: [
    DevAppLayout,
  ],
})
export class DevAppModule {
}
