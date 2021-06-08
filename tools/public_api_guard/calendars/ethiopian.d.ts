export declare class AjfEthiopianCalendarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfEthiopianCalendarModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfEthiopianCalendarModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfEthiopianCalendarModule, [typeof i1.AjfEthiopianDatePipe], never, [typeof i1.AjfEthiopianDatePipe]>;
}

export declare class AjfEthiopianCalendarService extends AjfCalendarService {
    buildView(params: AjfCalendarParams): AjfCalendarView;
    entryLabel(entry: AjfCalendarEntry): string;
    monthBounds(date: Date, isoMode: boolean): {
        start: Date;
        end: Date;
    };
    nextView(viewDate: Date, viewMode: AjfCalendarViewMode): Date;
    previousView(viewDate: Date, viewMode: AjfCalendarViewMode): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfEthiopianCalendarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfEthiopianCalendarService>;
}

export declare class AjfEthiopianDatePipe implements PipeTransform {
    transform(value: any): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfEthiopianDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfEthiopianDatePipe, "ajfEthiopianDate">;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfEthiopianDatePipe>;
}

export declare class EthiopianDate {
    constructor(val?: Date | string | number, month?: number, day?: number);
    getDate(): number;
    getDay(): number;
    getDayOfWeek(): string;
    getFullYear(): number;
    getGCWeekDay(): number;
    getGregorianDate(): Date;
    getHours(): number;
    getMilliseconds(): number;
    getMinutes(): number;
    getMonth(): number;
    getMonthName(): string | null;
    getSeconds(): number;
    getShortMonthName(): string | null;
    toString(): string;
    static ethiopianToGregorian(val?: EthiopianDate | string | number, month?: number, day?: number): Date;
    static gregorianToEthiopian(val?: Date | string | number, month?: number, day?: number): EthiopianDate;
    static parse(dateString: string): EthiopianDate | null;
}
