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

import {Injectable} from '@angular/core';
import {addDays, addMonths, addWeeks, addYears, endOfDay, endOfMonth, endOfISOWeek, endOfWeek,
  endOfYear, format, isAfter, isBefore, isSameDay, setISODay, startOfDay, startOfISOWeek,
  startOfMonth, startOfWeek, startOfYear, subMonths, subWeeks, subYears} from 'date-fns';

import {AjfCalendarEntry} from './calendar-entry';
import {AjfCalendarEntrySelectedState} from './calendar-entry-selected-state';
import {AjfCalendarPeriod} from './calendar-period';
import {AjfCalendarPeriodType} from './calendar-period-type';
import {AjfCalendarView} from './calendar-view';
import {AjfCalendarViewMode} from './calendar-view-mode';

export interface AjfCalendarParams {
  viewMode: AjfCalendarViewMode;
  viewDate: Date;
  selection: AjfCalendarPeriod|null;
  isoMode: boolean;
  minDate: Date|null;
  maxDate: Date|null;
}

function isBetween(date: Date, rangeLeft: Date, rangeRight: Date): boolean {
  return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft))
      && (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
}

function periodOrder(entryType: AjfCalendarPeriodType): number {
  return ['day', 'week', 'month', 'year'].indexOf(entryType);
}

@Injectable()
export class AjfCalendarService {
  buildView(params: AjfCalendarParams): AjfCalendarView {
    const {viewMode, viewDate} = params;
    switch (viewMode) {
      case 'decade':
        let curYear: number = viewDate.getFullYear();
        let firstYear = curYear - (curYear % 10) + 1;
        let lastYear = firstYear + 11;
        return {
          header: `${firstYear} - ${lastYear}`,
          headerRow: [],
          rows: this._decadeCalendarRows(params),
        };
      case 'year':
        return {
          header: `${viewDate.getFullYear()}`,
          headerRow: [],
          rows: this._yearCalendarRows(params),
        };
      case 'month':
        return {
          header: format(viewDate, 'MMM YYYY'),
          headerRow: this._monthHeaderRow(params),
          rows: this._monthCalendarRows(params),
        };
    }
    return {
      header: '',
      headerRow: [],
      rows: [],
    };
  }

  monthBounds(date: Date, isoMode: boolean): {start: Date, end: Date} {
    if (!isoMode) {
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
    }
    let startDate = startOfMonth(endOfISOWeek(date));
    let endDate = endOfMonth(startDate);
    const startWeekDay = startDate.getDay();
    const endWeekDay = endDate.getDay();
    if (startWeekDay == 0 || startWeekDay > 4) {
      startDate = addWeeks(startDate, 1);
    }
    if (endWeekDay > 0 && endWeekDay < 4) {
      endDate = subWeeks(endDate, 1);
    }
    startDate = startOfISOWeek(startDate);
    endDate = endOfISOWeek(endDate);
    return { start: startDate, end: endDate };
  }

  getEntryRange(entry: AjfCalendarEntry): {start: Date, end: Date} {
    if (entry.type === 'day') {
      return { start: new Date(entry.date), end: new Date(entry.date) };
    } else {
      let curDate: Date = new Date(entry.date);
      return {
        start: entry.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
        end: entry.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
      };
    }
  }

  isEntrySelected(
    entry: AjfCalendarEntry, selection: AjfCalendarPeriod|null
  ): AjfCalendarEntrySelectedState {
    if (selection != null && selection.startDate != null && selection.endDate != null) {
      let selectionStart: Date = startOfDay(selection.startDate);
      let selectionEnd: Date = endOfDay(selection.endDate);
      let selectionPeriodOrder: number = periodOrder(selection.type);

      let entryPeriodOrder: number = periodOrder(entry.type);
      let entryRange: { start: Date, end: Date } = this.getEntryRange(entry);

      if (entryPeriodOrder <= selectionPeriodOrder &&
        isBetween(entryRange.start, selectionStart, selectionEnd) &&
        isBetween(entryRange.end, selectionStart, selectionEnd)
      ) {
        return 'full';
      } else if (entryPeriodOrder > selectionPeriodOrder &&
        isBetween(selectionStart, entryRange.start, entryRange.end) &&
        isBetween(selectionEnd, entryRange.start, entryRange.end)
      ) {
        return 'partial';
      }
    }

    return 'none';
  }

  entryLabel(entry: AjfCalendarEntry): string {
    if (entry.type === 'day') {
      return `${entry.date.getDate()}`;
    }
    if (entry.type === 'month') {
      return format(entry.date, 'MMM');
    }
    return `${entry.date.getFullYear()}`;
  }

  nextView(viewDate: Date, viewMode: AjfCalendarViewMode): Date {
    if (viewMode == 'month') {
      return addMonths(viewDate, 1);
    } else if (viewMode == 'year') {
      return addYears(viewDate, 1);
    } else if (viewMode == 'decade') {
      return addYears(viewDate, 10);
    }
    return viewDate;
  }

  previousView(viewDate: Date, viewMode: AjfCalendarViewMode): Date {
    if (viewMode == 'month') {
      return subMonths(viewDate, 1);
    } else if (viewMode == 'year') {
      return subYears(viewDate, 1);
    } else if (viewMode == 'decade') {
      return subYears(viewDate, 10);
    }
    return viewDate;
  }

  private _monthHeaderRow(params: AjfCalendarParams): string[] {
    const {isoMode, viewDate} = params;
    let curDate: Date;
    if (isoMode) {
      curDate = setISODay(startOfWeek(viewDate), 1);
    } else {
      curDate = startOfWeek(viewDate);
    }
    let weekDayNames: string[] = [];
    for (let i = 0; i < 7; i++) {
      weekDayNames.push(format(curDate, 'dddd'));
      curDate = addDays(curDate, 1);
    }
    return weekDayNames;
  }

  private _decadeCalendarRows(params: AjfCalendarParams): AjfCalendarEntry[][] {
    const {viewDate, selection} = params;
    let curYear: number = viewDate.getFullYear();
    let firstYear = curYear - (curYear % 10) + 1;
    let curDate: Date = startOfYear(viewDate);
    curDate.setFullYear(firstYear);

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

  private _yearCalendarRows(params: AjfCalendarParams): AjfCalendarEntry[][] {
    const {viewDate, selection} = params;
    let curDate: Date = startOfYear(viewDate);

    let rows: AjfCalendarEntry[][] = [];
    for (let i = 0; i < 4; i++) {
      let row: AjfCalendarEntry[] = [];
      for (let j = 0; j < 3; j++) {
        let date = new Date(curDate);
        let newEntry: AjfCalendarEntry = {
          type: 'month',
          date: date,
          selected: 'none'
        };
        newEntry.selected = this.isEntrySelected(newEntry, selection);
        row.push(newEntry);
        curDate = addMonths(curDate, 1);
      }
      rows.push(row);
    }

    return rows;
  }

  private _monthCalendarRows(params: AjfCalendarParams): AjfCalendarEntry[][] {
    const {viewDate, selection, isoMode, minDate, maxDate} = params;
    const monthBounds = this.monthBounds(viewDate, isoMode);
    let viewStartDate: Date = new Date(monthBounds.start);
    let viewEndDate: Date = new Date(monthBounds.end);
    if (!isoMode) {
      viewStartDate = startOfWeek(viewStartDate);
      viewEndDate = endOfWeek(viewEndDate);
    }

    let rows: AjfCalendarEntry[][] = [];
    let todayDate = new Date();
    let curDate = new Date(viewStartDate);
    while (curDate < viewEndDate) {
      let row: AjfCalendarEntry[] = [];
      for (let i = 0; i < 7; i++) {
        let disabled = (minDate != null && isBefore(curDate, minDate)) ||
          (maxDate != null && isAfter(curDate, maxDate));
        let date = new Date(curDate);
        let newEntry: AjfCalendarEntry = {
          type: 'day',
          date: date,
          selected: 'none',
          highlight: format(todayDate, 'YYYY-MM-DD') === format(curDate, 'YYYY-MM-DD'),
          disabled: disabled
        };
        newEntry.selected = this.isEntrySelected(newEntry, selection);
        row.push(newEntry);
        curDate = addDays(curDate, 1);
      }
      rows.push(row);
    }
    return rows;
  }
}
