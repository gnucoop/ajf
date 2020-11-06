/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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

import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {
  endOfISOWeek,
  endOfWeek,
  endOfYear,
  parseISO as parse,
  startOfISOWeek,
  startOfWeek,
  startOfYear
} from 'date-fns';
import {Observable} from 'rxjs';

import {AjfCalendarEntry} from './calendar-entry';
import {AjfCalendarPeriod} from './calendar-period';
import {AjfCalendarPeriodType} from './calendar-period-type';
import {AjfCalendarService} from './calendar-service';
import {AjfCalendarViewMode} from './calendar-view-mode';
import {AjfCalendarWeekDay} from './calendar-week-day';

const weekDays: string[] =
    ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export class AjfCalendarChange {
  source: AjfCalendar;
  period: AjfCalendarPeriod|null;
}

@Directive()
export abstract class AjfCalendar implements AfterContentInit, ControlValueAccessor, OnInit {
  get viewDate(): Date {
    return this._viewDate;
  }
  @Input()
  set viewDate(viewDate: Date) {
    this._setViewDate(viewDate);
    this._cdr.markForCheck();
  }

  private _disabled = false;
  get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  set disabled(disabled: boolean) {
    const newDisabled = disabled != null && `${disabled}` !== 'false';
    if (newDisabled !== this._disabled) {
      this._disabled = newDisabled;
      this._cdr.markForCheck();
    }
  }

  private _dateOnlyForDay = false;
  get dateOnlyForDay(): boolean {
    return this._disabled;
  }
  @Input()
  set dateOnlyForDay(dateOnlyForDay: boolean) {
    this._dateOnlyForDay = dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
    this._cdr.markForCheck();
  }

  private _viewMode: AjfCalendarViewMode = 'month';
  get viewMode(): AjfCalendarViewMode {
    return this._viewMode;
  }
  @Input()
  set viewMode(viewMode: AjfCalendarViewMode) {
    this._viewMode = viewMode;
    this._buildCalendar();
    this._cdr.markForCheck();
  }

  private _selectionMode: AjfCalendarPeriodType = 'day';
  get selectionMode(): AjfCalendarPeriodType {
    return this._selectionMode;
  }
  @Input()
  set selectionMode(selectionMode: AjfCalendarPeriodType) {
    this._selectionMode = selectionMode;
    this._cdr.markForCheck();
  }

  private _startOfWeekDay = 1;
  get startOfWeekDay(): AjfCalendarWeekDay {
    return <AjfCalendarWeekDay>weekDays[this._startOfWeekDay];
  }
  @Input()
  set startOfWeekDay(weekDay: AjfCalendarWeekDay) {
    this._startOfWeekDay = weekDays.indexOf(weekDay);

    if (this._viewMode === 'month') {
      this._buildCalendar();
    }
    this._cdr.markForCheck();
  }

  private _isoMode: boolean = false;

  get isoMode(): boolean {
    return this._isoMode;
  }
  @Input()
  set isoMode(isoMode: boolean) {
    this._isoMode = isoMode;
    this._buildCalendar();
  }

  private _minDate: Date|null;
  get minDate(): Date|null {
    return this._minDate;
  }
  @Input()
  set minDate(minDate: Date|null) {
    this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
    this._cdr.markForCheck();
  }

  private _maxDate: Date|null;
  get maxDate(): Date|null {
    return this._maxDate;
  }
  @Input()
  set maxDate(maxDate: Date|null) {
    this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
    this._cdr.markForCheck();
  }

  private _change: EventEmitter<AjfCalendarChange> = new EventEmitter<AjfCalendarChange>();
  @Output()
  readonly change: Observable<AjfCalendarChange> = this._change as Observable<AjfCalendarChange>;

  private _selectedPeriod: AjfCalendarPeriod|null;
  @Input()
  set selectedPeriod(period: AjfCalendarPeriod|null) {
    this._selectedPeriod = period;
    this._change.emit({source: this, period: period});
    this._refreshSelection();
    this._cdr.markForCheck();
  }

  get value(): AjfCalendarPeriod|Date|null {
    if (this._dateOnlyForDay && this.selectionMode === 'day') {
      return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
    }
    return this._selectedPeriod;
  }
  @Input()
  set value(period: AjfCalendarPeriod|Date|null) {
    if (this._dateOnlyForDay && this.selectionMode === 'day' && period instanceof Date &&
        (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
      this.selectedPeriod = {type: 'day', startDate: period, endDate: period};
    } else if (period instanceof Object && period !== this._selectedPeriod) {
      this.selectedPeriod = <AjfCalendarPeriod>period;
      this._onChangeCallback(period);
    }
    this._cdr.markForCheck();
  }

  get calendarHeaders(): string[] {
    return this._calendarHeaders;
  }
  get calendarRows(): AjfCalendarEntry[][] {
    return this._calendarRows;
  }
  get viewHeader(): string {
    return this._viewHeader;
  }

  private _viewDate: Date = new Date();
  private _viewHeader = '';

  private _calendarRows: AjfCalendarEntry[][] = [];
  private _calendarHeaders: string[] = [];

  constructor(private _cdr: ChangeDetectorRef, private _service: AjfCalendarService) {}

  prevPage(): void {
    this.viewDate = this._service.previousView(this._viewDate, this._viewMode);
    this._buildCalendar();
  }

  nextPage(): void {
    this.viewDate = this._service.nextView(this._viewDate, this._viewMode);
    this._buildCalendar();
  }

  previousViewMode(): void {
    if (this._viewMode == 'decade') {
      return;
    } else if (this._viewMode == 'year') {
      this._viewMode = 'decade';
    } else if (this._viewMode == 'month') {
      this._viewMode = 'year';
    }
    this._buildCalendar();
  }

  selectEntry(entry: AjfCalendarEntry): void {
    if (!this._canSelectEntry(entry)) {
      return this._nextViewMode(entry);
    }

    let newPeriod: AjfCalendarPeriod|null = null;
    if (this._service.isEntrySelected(entry, this._selectedPeriod) == 'full') {
      newPeriod = null;
    } else if (this._selectionMode == 'day') {
      newPeriod = {type: 'day', startDate: entry.date, endDate: entry.date};
    } else if (this._selectionMode == 'week') {
      newPeriod = {
        type: 'week',
        startDate: this._isoMode ? startOfISOWeek(entry.date) : startOfWeek(entry.date, {
          weekStartsOn: this._startOfWeekDay as 0 | 1 | 2 | 3 | 4 | 5 | 6
        }),
        endDate: this._isoMode ?
            endOfISOWeek(entry.date) :
            endOfWeek(entry.date, {weekStartsOn: this._startOfWeekDay as 0 | 1 | 2 | 3 | 4 | 5 | 6})
      };
    } else if (this._selectionMode == 'month') {
      const monthBounds = this._service.monthBounds(entry.date, this._isoMode);
      newPeriod = {
        type: 'month',
        startDate: new Date(monthBounds.start),
        endDate: new Date(monthBounds.end)
      };
    } else if (this._selectionMode == 'year') {
      newPeriod = {
        type: 'year',
        startDate: startOfYear(entry.date),
        endDate: endOfYear(entry.date)
      };
    }
    this.value = newPeriod;

    this._onTouchedCallback();
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  writeValue(value: any) {
    if (typeof value === 'string') {
      value = parse(value);
    }
    this.value = value;
  }

  ngOnInit(): void {
    this._buildCalendar();
  }

  ngAfterContentInit(): void {
    this._refreshSelection();
  }

  private _onChangeCallback: (_: any) => void = (_: any) => {};
  private _onTouchedCallback: () => void = () => {};

  private _setViewDate(date: Date): void {
    this._viewDate = date;
  }

  private _buildCalendar(): void {
    const calendarView = this._service.buildView({
      viewMode: this._viewMode,
      viewDate: this._viewDate,
      selection: this._selectedPeriod,
      isoMode: this._isoMode,
      minDate: this._minDate == null ? null : new Date(this._minDate),
      maxDate: this._maxDate == null ? null : new Date(this._maxDate),
    });
    this._viewHeader = calendarView.header;
    this._calendarHeaders = calendarView.headerRow;
    this._calendarRows = calendarView.rows;
    this._cdr.markForCheck();
  }

  private _refreshSelection(): void {
    for (let row of this._calendarRows) {
      for (let entry of row) {
        entry.selected = this._service.isEntrySelected(entry, this._selectedPeriod);
      }
    }
  }

  private _canSelectEntry(entry: AjfCalendarEntry): boolean {
    if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
      return false;
    }
    if (this._selectionMode == 'month' && entry.type == 'year') {
      return false;
    }
    return true;
  }

  private _nextViewMode(entry: AjfCalendarEntry): void {
    if (this._viewMode == 'decade') {
      this._viewMode = 'year';
    } else if (this._viewMode == 'year') {
      this._viewMode = 'month';
    } else if (this._viewMode == 'month') {
      return;
    }
    this._viewDate = entry.date;
    this._buildCalendar();
  }
}
