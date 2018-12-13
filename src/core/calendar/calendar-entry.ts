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

import {format, endOfMonth, endOfYear, startOfMonth, startOfYear} from 'date-fns';

import {AjfCalendarEntrySelectedState} from './calendar-entry-selected-state';
import {AjfCalendarEntryType} from './calendar-entry-type';

export class AjfCalendarEntry {
  type: AjfCalendarEntryType;
  date: Date;
  selected: AjfCalendarEntrySelectedState;
  disabled = false;
  highlight = false;

  constructor(params: {
    type: AjfCalendarEntryType,
    date: Date,
    selected: AjfCalendarEntrySelectedState,
    highlight?: boolean,
    disabled?: boolean
  }) {
    let keys = Object.keys(params);

    this.type = params.type;
    this.date = params.date;
    this.selected = params.selected;
    if (keys.indexOf('disabled') > -1) {
      this.disabled = params.disabled!;
    }
    if (keys.indexOf('highlight') > -1) {
      this.highlight = params.highlight!;
    }
  }

  toString(): string {
    if (this.type === 'day') {
      return `${this.date.getDate()}`;
    }
    if (this.type === 'month') {
      return format(this.date, 'MMM');
    }
    return `${this.date.getFullYear()}`;
  }

  getRange(): { start: Date, end: Date } {
    if (this.type === 'day') {
      return { start: new Date(this.date), end: new Date(this.date) };
    } else {
      let curDate: Date = new Date(this.date);
      return {
        start: this.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
        end: this.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
      };
    }
  }
}
