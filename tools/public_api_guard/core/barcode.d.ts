export declare abstract class AjfBarcode implements ControlValueAccessor, OnDestroy {
    protected _readonly: boolean;
    readonly _startCalculationSub: Subscription;
    readonly _startDetectionSub: Subscription;
    get canvasCtx(): CanvasRenderingContext2D;
    readonly codeReader: BrowserBarcodeReader;
    get readonly(): boolean;
    set readonly(readonly: boolean);
    readonly startCalculation: EventEmitter<string>;
    readonly startDetection: EventEmitter<void>;
    get toggle(): string;
    set toggle(val: string);
    get value(): string;
    set value(value: string);
    get videoSource(): HTMLVideoElement;
    constructor(_cdr: ChangeDetectorRef, _renderer: Renderer2);
    ngOnDestroy(): void;
    onSelectFile(evt: Event): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    reset(): void;
    takeSnapshot(): void;
    writeValue(value: string): void;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfBarcode, never, never, { "readonly": "readonly"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfBarcode, never>;
}
