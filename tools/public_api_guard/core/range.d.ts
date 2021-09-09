export declare abstract class AjfRange extends AjfBaseFieldComponent<AjfRangeFieldInstance> implements ControlValueAccessor, OnInit {
    cdr: ChangeDetectorRef;
    get end(): number | undefined;
    set end(newEnd: number | undefined);
    get name(): string | undefined;
    set name(newName: string | undefined);
    get start(): number | undefined;
    set start(newStart: number | undefined);
    get step(): number | undefined;
    set step(newStep: number | undefined);
    get value(): number;
    set value(newValue: number);
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    ngOnInit(): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    reset(): void;
    writeValue(value: number): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfRange, never, never, { "end": "end"; "name": "name"; "start": "start"; "step": "step"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfRange, never>;
}
