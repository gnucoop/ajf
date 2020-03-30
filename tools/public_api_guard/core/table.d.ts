export declare class AjfTable {
    get cellpadding(): string;
    set cellpadding(cellpadding: string);
    get data(): AjfTableCell[][];
    set data(data: AjfTableCell[][]);
    constructor(_cdr: ChangeDetectorRef, _domSanitizer: DomSanitizer);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTable, "ajf-table", never, { "data": "data"; "cellpadding": "cellpadding"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTable, never>;
}

export interface AjfTableCell {
    colspan?: number;
    rowspan?: number;
    style: any;
    value: any;
}

export declare class AjfTableModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfTableModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfTableModule, [typeof i1.AjfTable], [typeof i2.AjfCommonModule, typeof i3.CommonModule], [typeof i1.AjfTable]>;
}
