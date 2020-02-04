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

import {toEC, toGC} from './converter';
import {MONTHS_NAMES, SHORT_MONTHS_NAMES, WEEK_NAMES} from './utils';

export class EthiopianDate {
  private _year: number;
  private _month: number;
  private _date: number;
  private _gc: Date;

  /**
   * @param val - A numeric year value if the second and third parameters ar provided,
   *                                        It should be a date string if not
   * @param month A zero-based numeric value for the month (0 for መስከረም, 12 for ጳጉሜን)
   * @param day A numeric value equal for the day of the month.
   */
  constructor(val?: Date|string|number, month?: number, day?: number) {
    if (val == null && month == null && day == null) {
      const ahun = EthiopianDate.gregorianToEthiopian(new Date());
      [this._year, this._month, this._date] = [ahun.getFullYear(), ahun.getMonth(), ahun.getDate()];
      this._gc = EthiopianDate.ethiopianToGregorian(this._year, this._month, this._date);
    } else if (val != null && month == null && day == null && typeof val !== 'number') {
      if (typeof val === 'string') {
        const result = EthiopianDate.parse(val);
        if (result == null) {
          throw new Error('Invalid Argument Exception');
        }
        [this._year, this._month, this._date] = [
          result.getFullYear(), result.getMonth(), result.getDate()];
        this._gc = EthiopianDate.ethiopianToGregorian(this._year, this._month, this._date);
      } else if (typeof val === 'object' && val instanceof Date) {
        const result = EthiopianDate.gregorianToEthiopian(
          val.getFullYear(), val.getMonth() + 1, val.getDate());
        [this._year, this._month, this._date] = [
          result.getFullYear(), result.getMonth(), result.getDate()];
        this._gc = EthiopianDate.ethiopianToGregorian(this._year, this._month, this._date);
      } else {
        throw new Error('Invalid Argument Exception');
      }
    } else if (val != null && month != null && day != null && typeof val === 'number') {
      this._year = val;
      this._month = month;
      this._date = day;
      this._gc = EthiopianDate.ethiopianToGregorian(this._year, this._month, this._date);
    }
  }

  getDate(): number {
    return this._date;
  }

  getDayOfWeek() {
    const weekDay = this.getGCWeekDay();
    return WEEK_NAMES[weekDay];
  }

  getFullYear(): number {
    return this._year;
  }

  getGregorianDate(): Date {
    return this._gc;
  }

  getGCWeekDay(): number {
    return this._gc.getDay();
  }

  getMonth(): number {
    return this._month;
  }

  getMonthName(): string|null {
    return this._month >= 0 && this._month < MONTHS_NAMES.length
      ? MONTHS_NAMES[this._month]
      : null;
  }

  getShortMonthName(): string|null {
      return this._month >= 0 && this._month < SHORT_MONTHS_NAMES.length
        ? SHORT_MONTHS_NAMES[this._month]
        : null;
  }

  toString() {
    return `${this._year}-${this._month + 1}-${this._date}`;
  }

  /**
   * Converts a Ethiopian date to Gregorian and returns Date instance representing Gregorian Date.
   *
   * @param val - A numeric year value if the second and third parameters are
   *                                   provided, it should be a date string if not
   * @param month A zero-based numeric value for the month
   *                         (0 for January, 11 for December)
   * @param day A numeric value equal for the day of the month.
   *
   * @api public
   */
  static ethiopianToGregorian(
    val?: EthiopianDate|string|number, month?: number, day?: number
  ): Date {
    let ec: [number, number, number];
    if (val != null && month == null && day == null && typeof val !== 'number') {
      if (typeof val === 'string') {
        const etDate = new EthiopianDate(val);
        ec = [etDate.getFullYear(), etDate.getMonth() + 1, etDate.getDate()];
      } else if (typeof val === 'object' && val instanceof EthiopianDate) {
        const [y, m, d] = [val.getFullYear(), val.getMonth() + 1, val.getDate()];
        ec = [y, m, d];
      } else {
          throw new Error('Invalid Argument Exception');
      }
    } else if (val != null && month != null && day != null && typeof val === 'number') {
      ec = [val, month + 1, day];
    } else {
      throw new Error('Invalid Argument Exception');
    }
    const gc = toGC(ec);
    return new Date(gc[0], gc[1] - 1, gc[2]);
  }

  static gregorianToEthiopian(
    val?: Date|string|number, month?: number, day?: number
  ): EthiopianDate {
    let gc: [number, number, number];
    if (val != null && month == null && day == null && typeof val !== 'number') {
      if (typeof val === 'string') {
        const gcDate = new Date(val);
        gc = [gcDate.getFullYear(), gcDate.getMonth() + 1, gcDate.getDate()];
      } else if (typeof val === 'object' && val instanceof Date) {
        const [y, m, d] = [val.getFullYear(), val.getMonth() + 1, val.getDate()];
        gc = [y, m, d];
      } else {
          throw new Error('Invalid Argument Exception');
      }
    } else if (val != null && month != null && day != null && typeof val === 'number') {
      gc = [val, month + 1, day];
    } else {
      throw new Error('Invalid Argument Exception');
    }
    const ec = toEC(gc);
    return new EthiopianDate(ec[0], ec[1] - 1, ec[2]);
  }

  /**
   * Parse Ethiopian date from string
   *
   * @param dateString a date string to parse
   * @param pattern a parsing pattern
   *
   * @returns EthiopianDate
   */
  static parse(dateString: string): EthiopianDate|null {
    if (!dateString) {
        return null;
    }
    const result = dateString.split('-');
    if (result.length === 3) {
        const [y, m, d] = result;
        return new EthiopianDate(
          parseInt(y, 10),
          parseInt(m, 10) - 1,
          parseInt(d, 10)
        );
    }
    throw new Error(`ParsingError: Can't parse ${dateString}`);
  }
}
