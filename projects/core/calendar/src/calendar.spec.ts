import {isSameDay} from 'date-fns';

import {AjfCalendar as Base} from './calendar';
import {AjfCalendarEntry} from './calendar-entry';
import {AjfCalendarPeriod} from './calendar-period';
import {AjfCalendarService} from './calendar-service';

class MockCdr {
  markForCheck = () => {};
}

class AjfCalendar extends Base {
  constructor() {
    super(new MockCdr() as any, new AjfCalendarService());
  }
}

describe('AjfCalendar', () => {
  describe('iso mode month selection mode', () => {
    it('should select the iso month based on the selected entry', () => {
      const calendar = new AjfCalendar();

      calendar.isoMode = true;
      calendar.selectionMode = 'month';
      calendar.viewMode = 'month';

      const entry: AjfCalendarEntry = {
        type: 'day',
        date: new Date(2019, 6, 29),
        selected: 'none',
      };

      calendar.selectEntry(entry);

      const value = calendar.value as AjfCalendarPeriod;
      const startDate = new Date(2019, 6, 29);
      const endDate = new Date(2019, 8, 1);
      expect(value.type).toEqual('month');
      expect(isSameDay(value.startDate, startDate)).toEqual(true);
      expect(isSameDay(value.endDate, endDate)).toEqual(true);
    });
  });
});
