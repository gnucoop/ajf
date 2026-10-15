// Providers for the TestBed set up by the `unit-test` builder (`providersFile` in angular.json).
// The library is built with ng-packagr, which declares no polyfills, so the builder would
// initialize TestBed zoneless; the tests keep running on zone.js, like the applications do.
import 'zone.js';
import {provideZoneChangeDetection} from '@angular/core';

export default [provideZoneChangeDetection()];
