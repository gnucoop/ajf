export declare class AjfBarcodeComponent extends AjfBarcode {
    constructor(cdr: ChangeDetectorRef, renderer: Renderer2);
    onSelectSegment(segment: string): void;
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfBarcodeComponent, "ajf-barcode", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfBarcodeComponent>;
}

export declare class AjfBarcodeModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfBarcodeModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfBarcodeModule, [typeof i1.AjfBarcodeComponent], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.TranslateModule, typeof i5.IonicModule, typeof i6.AjfCommonModule], [typeof i1.AjfBarcodeComponent]>;
}

export declare const BARCODE_CONTROL_VALUE_ACCESSOR: any;
