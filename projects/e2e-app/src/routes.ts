import {Routes} from '@angular/router';

import {Home} from './e2e-app/e2e-app-layout';
import {FileInputE2E} from './file-input/file-input-e2e';
import {GraphE2E} from './graph/graph-e2e';
import {MaterialCalendarE2E} from './mat-calendar/calendar-e2e';
import {MaterialDateInputFieldE2E} from './mat-date-input-field/date-input-field-e2e';
import {MaterialFormE2E} from './mat-form/mat-form-e2e';
import {MaterialReportE2E} from './mat-report/mat-report-e2e';
import {MaterialTableFieldE2E} from './mat-table-field/table-field-e2e';
import {TranslocoE2E} from './transloco/transloco-e2e';

export const E2E_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'file-input', component: FileInputE2E},
  {path: 'graph', component: GraphE2E},
  {path: 'transloco', component: TranslocoE2E},
  {path: 'mat-calendar', component: MaterialCalendarE2E},
  {path: 'mat-date-input-field', component: MaterialDateInputFieldE2E},
  {path: 'mat-form', component: MaterialFormE2E},
  {path: 'mat-report', component: MaterialReportE2E},
  {path: 'mat-table-field', component: MaterialTableFieldE2E},
];
