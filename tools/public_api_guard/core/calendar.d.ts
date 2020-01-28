export declare abstract class AjfCalendar implements AfterContentInit, ControlValueAccessor, OnInit {
    readonly calendarHeaders: string[];
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
    constructor(_cdr: ChangeDetectorRef, _service: AjfCalendarService);
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

export interface AjfCalendarEntry {
    date: Date;
    disabled?: boolean;
    highlight?: boolean;
    selected: AjfCalendarEntrySelectedState;
    type: AjfCalendarEntryType;
}

export declare type AjfCalendarEntrySelectedState = ('none' | 'partial' | 'full');

export declare type AjfCalendarEntryType = ('day' | 'month' | 'year');

export declare class AjfCalendarModule {
}

export interface AjfCalendarParams {
    isoMode: boolean;
    maxDate: Date | null;
    minDate: Date | null;
    selection: AjfCalendarPeriod | null;
    viewDate: Date;
    viewMode: AjfCalendarViewMode;
}

export declare class AjfCalendarPeriod {
    endDate: Date;
    startDate: Date;
    type: AjfCalendarPeriodType;
}

export declare type AjfCalendarPeriodType = ('day' | 'week' | 'month' | 'year');

export declare class AjfCalendarService {
    buildView(params: AjfCalendarParams): AjfCalendarView;
    entryLabel(entry: AjfCalendarEntry): string;
    getEntryRange(entry: AjfCalendarEntry): {
        start: Date;
        end: Date;
    };
    isEntrySelected(entry: AjfCalendarEntry, selection: AjfCalendarPeriod | null): AjfCalendarEntrySelectedState;
    monthBounds(date: Date, isoMode: boolean): {
        start: Date;
        end: Date;
    };
    nextView(viewDate: Date, viewMode: AjfCalendarViewMode): Date;
    previousView(viewDate: Date, viewMode: AjfCalendarViewMode): Date;
}

export interface AjfCalendarView {
    header: string;
    headerRow: string[];
    rows: AjfCalendarEntry[][];
}

export declare type AjfCalendarViewMode = ('month' | 'year' | 'decade');

export declare type AjfCalendarWeekDay = ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday');
