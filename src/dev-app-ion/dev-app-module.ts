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

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, RouteReuseStrategy} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {EXAMPLE_COMPONENTS, ExampleModule} from '@ajf/ionic-examples';
import {AdminEditDemo} from './admin-edit/admin-edit-demo';
import {CalendarDemo} from './calendar/calendar-demo';
import {DevAppComponent, DevAppHome} from './dev-app';
import {ExamplePageModule} from './example/example-module';
import {ExamplesPage} from './examples-page/examples-page';
import {DevAppAjfModule} from './ajf-module';
import {LoginDemo} from './login/login-demo';
import {DEV_APP_ROUTES} from './routes';


export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(DEV_APP_ROUTES),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    DevAppAjfModule,
    ExampleModule,
    ExamplePageModule,
  ],
  declarations: [
    AdminEditDemo,
    CalendarDemo,
    DevAppComponent,
    DevAppHome,
    ExamplesPage,
    LoginDemo,
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [DevAppComponent]
})
export class DevAppModule {
  constructor(injector: Injector) {
    // Register examples as custom elements so that they can be inserted into the DOM dynamically
    Object.keys(EXAMPLE_COMPONENTS).forEach(key => {
      const element = createCustomElement(EXAMPLE_COMPONENTS[key].component, {injector});
      customElements.define(key, element);
    });
  }
}
