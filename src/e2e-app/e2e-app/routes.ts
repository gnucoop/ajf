import {Routes} from '@angular/router';
import {FileInputE2E} from '../file-input/file-input-e2e';
import {IonicCalendarE2E} from '../ion-calendar/calendar-e2e';
import {IonicDateInputFieldE2E} from '../ion-date-input-field/date-input-field-e2e';
import {IonicFormE2E} from '../ion-form/ion-form-e2e';
import {IonicReportE2E} from '../ion-report/ion-report-e2e';
import {IonicTableFieldE2E} from '../ion-table-field/table-field-e2e';
import {MaterialCalendarE2E} from '../mat-calendar/calendar-e2e';
import {MaterialDateInputFieldE2E} from '../mat-date-input-field/date-input-field-e2e';
import {MaterialFormE2E} from '../mat-form/mat-form-e2e';
import {MaterialReportE2E} from '../mat-report/mat-report-e2e';
import {MaterialTableFieldE2E} from '../mat-table-field/table-field-e2e';
import {Home} from './e2e-app-layout';

export const E2E_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'file-input', component: FileInputE2E},
  {path: 'ion-calendar', component: IonicCalendarE2E},
  {path: 'ion-date-input-field', component: IonicDateInputFieldE2E},
  {path: 'ion-form', component: IonicFormE2E},
  {path: 'ion-report', component: IonicReportE2E},
  {path: 'ion-table-field', component: IonicTableFieldE2E},
  {path: 'mat-calendar', component: MaterialCalendarE2E},
  {path: 'mat-date-input-field', component: MaterialDateInputFieldE2E},
  {path: 'mat-form', component: MaterialFormE2E},
  {path: 'mat-report', component: MaterialReportE2E},
  {path: 'mat-table-field', component: MaterialTableFieldE2E},
];
