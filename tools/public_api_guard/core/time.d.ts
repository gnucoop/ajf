export declare abstract class AjfTime implements ControlValueAccessor, OnDestroy {
    get hours(): number;
    set hours(hours: number);
    get minutes(): number;
    set minutes(minutes: number);
    readonly: boolean;
    get time(): AjfTimeModel;
    get value(): string;
    set value(value: string);
    constructor();
    focusHandler(): void;
    ngOnDestroy(): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    writeValue(value: string): void;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfTime, never, never, { "readonly": "readonly"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTime>;
}

export declare class AjfTimeModel {
    readonly changed: Observable<string>;
    get hours(): number;
    set hours(value: number);
    get minutes(): number;
    set minutes(value: number);
    fromString(value: string): void;
    toString(): string;
}
