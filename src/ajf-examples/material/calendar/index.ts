import {AjfCalendarModule} from '@ajf/material/calendar';
import {NgModule} from '@angular/core';

import {MaterialCalendarSimpleExample} from './material-calendar-simple/calendar-simple-example';

export {
  MaterialCalendarSimpleExample,
};

const EXAMPLES = [
  MaterialCalendarSimpleExample,
];

@NgModule({
  imports: [
    AjfCalendarModule,
  ],
  declarations: EXAMPLES,
  exports: EXAMPLES,
})
export class CalendarExamplesModule {
}
