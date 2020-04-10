import {AjfCalendarModule} from '@ajf/ionic/calendar';
import {NgModule} from '@angular/core';

import {IonicCalendarSimpleExample} from './calendar-simple/calendar-simple-example';

export {
  IonicCalendarSimpleExample,
};

const EXAMPLES = [
  IonicCalendarSimpleExample,
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
