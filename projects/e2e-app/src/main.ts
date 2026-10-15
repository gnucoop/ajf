import {enableProdMode, provideZoneChangeDetection} from '@angular/core';
import {platformBrowser} from '@angular/platform-browser';

import {MainModule} from './main-module';

enableProdMode();

platformBrowser().bootstrapModule(MainModule, {
  applicationProviders: [provideZoneChangeDetection()],
});
