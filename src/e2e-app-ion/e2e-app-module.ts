import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AjfCalendarModule} from '@ajf/ionic/calendar';
import {ExampleModule} from '@ajf/ionic-examples';
import {CalendarE2E} from './calendar/calendar-e2e';
import {E2EApp, Home} from './e2e-app/e2e-app';
import {E2E_APP_ROUTES} from './e2e-app/routes';


export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * NgModule that contains all Ionic modules that are required to serve the e2e-app.
 */
@NgModule({
  exports: [
  ]
})
export class E2eIonicModule {}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(E2E_APP_ROUTES),
    IonicModule.forRoot(),
    E2eIonicModule,
    NoopAnimationsModule,
    ExampleModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    AjfCalendarModule,
  ],
  declarations: [
    CalendarE2E,
    E2EApp,
    Home,
  ],
  bootstrap: [E2EApp],
  entryComponents: []
})
export class E2eAppModule { }
