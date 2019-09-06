import {Routes} from '@angular/router';
import {CalendarE2E} from '../calendar/calendar-e2e';
import {DateInputFieldE2E} from '../date-input-field/date-input-field-e2e';
import {TableFieldE2E} from '../table-field/table-field-e2e';
import {Home} from './e2e-app-layout';

export const E2E_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'calendar', component: CalendarE2E},
  {path: 'date-input-field', component: DateInputFieldE2E},
  {path: 'table-field', component: TableFieldE2E},
];
