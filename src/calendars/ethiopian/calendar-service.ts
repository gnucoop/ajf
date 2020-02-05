/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {AjfCalendarEntry, AjfCalendarService, AjfCalendarParams,
  AjfCalendarView, AjfCalendarViewMode} from '@ajf/core/calendar';
import {Injectable} from '@angular/core';
import {addDays, addWeeks, addYears, endOfISOWeek, getISODay, setISODay, startOfISOWeek,
  startOfWeek, subWeeks} from 'date-fns';

import {EthiopianDate} from './ethiopian-date';

function getMonthBounds(date: EthiopianDate): {start: EthiopianDate, end: EthiopianDate} {
  const year = date.getFullYear();
  const month = date.getMonth();
  const start = new EthiopianDate(year, month, 1);
  const endDay = month < 12 ? 30 : (year % 4 === 3 ? 6 : 5);
  const end = new EthiopianDate(year, month, endDay);
  return {start, end};
}

@Injectable({providedIn: 'root'})
export class AjfEthiopianCalendarService extends AjfCalendarService {
  buildView(params: AjfCalendarParams): AjfCalendarView {
    const {viewMode} = params;
    const viewDate = EthiopianDate.gregorianToEthiopian(params.viewDate);
    switch (viewMode) {
      case 'decade':
        let curYear: number = viewDate.getFullYear();
        let firstYear = curYear - (curYear % 10) + 1;
        let lastYear = firstYear + 11;
        return {
          header: `${firstYear} - ${lastYear}`,
          headerRow: [],
          rows: this._ecDecadeCalendarRows(params),
        };
      case 'year':
        return {
          header: `${viewDate.getFullYear()}`,
          headerRow: [],
          rows: this._ecYearCalendarRows(params),
        };
      case 'month':
        const view = super.buildView(params);
        return {
          header: `${viewDate.getShortMonthName()} ${viewDate.getFullYear()}`,
          headerRow: this._ecMonthHeaderRow(params),
          rows: view.rows,
        };
    }
    return super.buildView(params);
  }

  entryLabel(entry: AjfCalendarEntry): string {
    const ecDate = EthiopianDate.gregorianToEthiopian(entry.date);
    if (entry.type === 'day') {
      return `${ecDate.getDate()}`;
    }
    if (entry.type === 'month') {
      return `${ecDate.getMonthName()}`;
    }
    return `${ecDate.getFullYear()}`;
  }

  monthBounds(date: Date, isoMode: boolean): {start: Date, end: Date} {
    if (!isoMode) {
      const ecDate = EthiopianDate.gregorianToEthiopian(date);
      const {start, end} = getMonthBounds(ecDate);
      return {
        start: EthiopianDate.ethiopianToGregorian(start),
        end: EthiopianDate.ethiopianToGregorian(end),
      };
    } else {
      let isoDay = getISODay(date);
      const ecDate = EthiopianDate.gregorianToEthiopian(date);
      let {start, end} = getMonthBounds(ecDate);
      if (ecDate.getMonth() === 12) {
        start = EthiopianDate.gregorianToEthiopian(startOfISOWeek(start.getGregorianDate()));
        end = EthiopianDate.gregorianToEthiopian(endOfISOWeek(end.getGregorianDate()));
      } else {
        date = isoDay < 4 ? endOfISOWeek(date) : startOfISOWeek(date);
        const startWeekDay = start.getDay();
        const endWeekDay = end.getDay();
        if (startWeekDay == 0 || startWeekDay > 4) {
          start = EthiopianDate.gregorianToEthiopian(addWeeks(start.getGregorianDate(), 1));
        }
        if (endWeekDay > 0 && endWeekDay < 4) {
          end = EthiopianDate.gregorianToEthiopian(subWeeks(end.getGregorianDate(), 1));
        }
      }
      return {
        start: startOfISOWeek(start.getGregorianDate()),
        end: endOfISOWeek(end.getGregorianDate()),
      };
    }
  }

  nextView(viewDate: Date, viewMode: AjfCalendarViewMode): Date {
    if (viewMode === 'month') {
      const ecDate = EthiopianDate.gregorianToEthiopian(viewDate);
      let year = ecDate.getFullYear();
      let month = ecDate.getMonth();
      if (month === 12) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
      return EthiopianDate.ethiopianToGregorian(new EthiopianDate(year, month, 1));
    }
    return super.nextView(viewDate, viewMode);
  }

  previousView(viewDate: Date, viewMode: AjfCalendarViewMode): Date {
    if (viewMode === 'month') {
      const ecDate = EthiopianDate.gregorianToEthiopian(viewDate);
      let year = ecDate.getFullYear();
      let month = ecDate.getMonth();
      if (month === 0) {
        month = 12;
        year -= 1;
      } else {
        month -= 1;
      }
      return EthiopianDate.ethiopianToGregorian(new EthiopianDate(year, month, 1));
    }
    return super.previousView(viewDate, viewMode);
  }

  private _ecMonthHeaderRow(params: AjfCalendarParams): string[] {
    const {isoMode, viewDate} = params;
    let curDate: Date;
    if (isoMode) {
      curDate = setISODay(startOfWeek(viewDate), 1);
    } else {
      curDate = startOfWeek(viewDate);
    }
    let weekDayNames: string[] = [];
    for (let i = 0; i < 7; i++) {
      const ecDate = EthiopianDate.gregorianToEthiopian(curDate);
      weekDayNames.push(ecDate.getDayOfWeek());
      curDate = addDays(curDate, 1);
    }
    return weekDayNames;
  }

  private _ecYearCalendarRows(params: AjfCalendarParams): AjfCalendarEntry[][] {
    const {viewDate, selection} = params;
    const year = EthiopianDate.gregorianToEthiopian(viewDate).getFullYear();
    let curDate: EthiopianDate;

    let rows: AjfCalendarEntry[][] = [];
    for (let i = 0; i <= 4; i++) {
      let row: AjfCalendarEntry[] = [];
      for (let j = 0; j < 3; j++) {
        const curMonth = i * 3 + j;
        if (curMonth < 13) {
          curDate = new EthiopianDate(year, curMonth, 1);
          let date = EthiopianDate.ethiopianToGregorian(curDate);
          let newEntry: AjfCalendarEntry = {
            type: 'month',
            date,
            selected: 'none'
          };
          newEntry.selected = this.isEntrySelected(newEntry, selection);
          row.push(newEntry);
        }
      }
      rows.push(row);
    }

    return rows;
  }

  private _ecDecadeCalendarRows(params: AjfCalendarParams): AjfCalendarEntry[][] {
    const {viewDate, selection} = params;
    const ecDate = EthiopianDate.gregorianToEthiopian(viewDate);
    let curYear: number = ecDate.getFullYear();
    let firstYear = curYear - (curYear % 10) + 1;
    let curDate: Date = EthiopianDate.ethiopianToGregorian(firstYear, 1, 1);

    let rows: AjfCalendarEntry[][] = [];
    for (let i = 0; i < 4; i++) {
      let row: AjfCalendarEntry[] = [];
      for (let j = 0; j < 3; j++) {
        let date = new Date(curDate);
        let newEntry: AjfCalendarEntry = {
          type: 'year',
          date: date,
          selected: 'none'
        };
        newEntry.selected = this.isEntrySelected(newEntry, selection);
        row.push(newEntry);
        curDate = addYears(curDate, 1);
      }
      rows.push(row);
    }

    return rows;
  }
}
