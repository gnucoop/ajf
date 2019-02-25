export declare abstract class AjfCalendar implements AfterContentInit, ControlValueAccessor, OnInit {
    readonly calendarRows: AjfCalendarEntry[][];
    readonly change: Observable<AjfCalendarChange>;
    dateOnlyForDay: boolean;
    disabled: boolean;
    isoMode: boolean;
    maxDate: Date | null;
    minDate: Date | null;
    selectionMode: AjfCalendarPeriodType;
    startOfWeekDay: AjfCalendarWeekDay;
    value: AjfCalendarPeriod | Date | null;
    viewDate: Date;
    readonly viewHeader: string;
    viewMode: AjfCalendarViewMode;
    readonly weekDays: string[];
    constructor(_cdr: ChangeDetectorRef);
    nextPage(): void;
    ngAfterContentInit(): void;
    ngOnInit(): void;
    prevPage(): void;
    previousViewMode(): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    selectEntry(entry: AjfCalendarEntry): void;
    writeValue(value: any): void;
}

export declare class AjfCalendarChange {
    period: AjfCalendarPeriod | null;
    source: AjfCalendar;
}

export declare class AjfCalendarEntry {
    date: Date;
    disabled: boolean;
    highlight: boolean;
    selected: AjfCalendarEntrySelectedState;
    type: AjfCalendarEntryType;
    constructor(params: {
        type: AjfCalendarEntryType;
        date: Date;
        selected: AjfCalendarEntrySelectedState;
        highlight?: boolean;
        disabled?: boolean;
    });
    getRange(): {
        start: Date;
        end: Date;
    };
    toString(): string;
}

export declare type AjfCalendarEntrySelectedState = ('none' | 'partial' | 'full');

export declare type AjfCalendarEntryType = ('day' | 'month' | 'year');

export declare class AjfCalendarPeriod {
    endDate: Date;
    startDate: Date;
    type: AjfCalendarPeriodType;
}

export declare type AjfCalendarPeriodType = ('day' | 'week' | 'month' | 'year');

export declare type AjfCalendarViewMode = ('month' | 'year' | 'decade');

export declare type AjfCalendarWeekDay = ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday');
