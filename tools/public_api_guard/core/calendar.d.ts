export declare abstract class AjfCalendar implements AfterContentInit, ControlValueAccessor, OnInit {
    get calendarHeaders(): string[];
    get calendarRows(): AjfCalendarEntry[][];
    readonly change: Observable<AjfCalendarChange>;
    get dateOnlyForDay(): boolean;
    set dateOnlyForDay(dateOnlyForDay: boolean);
    get disabled(): boolean;
    set disabled(disabled: boolean);
    get isoMode(): boolean;
    set isoMode(isoMode: boolean);
    get maxDate(): Date | null;
    set maxDate(maxDate: Date | null);
    get minDate(): Date | null;
    set minDate(minDate: Date | null);
    set selectedPeriod(period: AjfCalendarPeriod | null);
    get selectionMode(): AjfCalendarPeriodType;
    set selectionMode(selectionMode: AjfCalendarPeriodType);
    get startOfWeekDay(): AjfCalendarWeekDay;
    set startOfWeekDay(weekDay: AjfCalendarWeekDay);
    get value(): AjfCalendarPeriod | Date | null;
    set value(period: AjfCalendarPeriod | Date | null);
    get viewDate(): Date;
    set viewDate(viewDate: Date);
    get viewHeader(): string;
    get viewMode(): AjfCalendarViewMode;
    set viewMode(viewMode: AjfCalendarViewMode);
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
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfCalendar, never, never, { "viewDate": "viewDate"; "disabled": "disabled"; "dateOnlyForDay": "dateOnlyForDay"; "viewMode": "viewMode"; "selectionMode": "selectionMode"; "startOfWeekDay": "startOfWeekDay"; "isoMode": "isoMode"; "minDate": "minDate"; "maxDate": "maxDate"; "selectedPeriod": "selectedPeriod"; "value": "value"; }, { "change": "change"; }, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfCalendar>;
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

export declare class AjfCalendarEntryLabelPipe implements PipeTransform {
    constructor(_service: AjfCalendarService);
    transform(entry: AjfCalendarEntry): string;
    static ɵfac: i0.ɵɵFactoryDef<AjfCalendarEntryLabelPipe>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfCalendarEntryLabelPipe, "ajfCalendarEntryLabel">;
    static ɵprov: i0.ɵɵInjectableDef<AjfCalendarEntryLabelPipe>;
}

export declare type AjfCalendarEntrySelectedState = ('none' | 'partial' | 'full');

export declare type AjfCalendarEntryType = ('day' | 'month' | 'year');

export declare class AjfCalendarModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfCalendarModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfCalendarModule, [typeof i1.AjfCalendarEntryLabelPipe], never, [typeof i1.AjfCalendarEntryLabelPipe]>;
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
    static ɵfac: i0.ɵɵFactoryDef<AjfCalendarService>;
    static ɵprov: i0.ɵɵInjectableDef<AjfCalendarService>;
}

export interface AjfCalendarView {
    header: string;
    headerRow: string[];
    rows: AjfCalendarEntry[][];
}

export declare type AjfCalendarViewMode = ('month' | 'year' | 'decade');

export declare type AjfCalendarWeekDay = ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday');

export declare class AjfGregorianCalendarModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfGregorianCalendarModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfGregorianCalendarModule, never, never, never>;
}
