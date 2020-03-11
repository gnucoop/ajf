import {Routes} from '@angular/router';
import {IonicCalendarE2E} from '../ion-calendar/calendar-e2e';
import {IonicDateInputFieldE2E} from '../ion-date-input-field/date-input-field-e2e';
import {MaterialCalendarE2E} from '../mat-calendar/calendar-e2e';
import {MaterialDateInputFieldE2E} from '../mat-date-input-field/date-input-field-e2e';
import {MaterialTableFieldE2E} from '../mat-table-field/table-field-e2e';
import {Home} from './e2e-app-layout';

export const E2E_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'ion-calendar', component: IonicCalendarE2E},
  {path: 'ion-date-input-field', component: IonicDateInputFieldE2E},
  {path: 'mat-calendar', component: MaterialCalendarE2E},
  {path: 'mat-date-input-field', component: MaterialDateInputFieldE2E},
  {path: 'mat-table-field', component: MaterialTableFieldE2E},
];
