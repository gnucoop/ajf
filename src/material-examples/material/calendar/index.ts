import {AjfCalendarModule} from '@ajf/material/calendar';
import {NgModule} from '@angular/core';

import {CalendarSimpleExample} from './calendar-simple/calendar-simple-example';

export {
  CalendarSimpleExample
};

const EXAMPLES = [
  CalendarSimpleExample
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
