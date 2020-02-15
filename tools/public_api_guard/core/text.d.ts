export declare class AjfTextComponent {
    set htmlText(htmlText: string);
    get innerHTML(): SafeHtml;
    constructor(_cdr: ChangeDetectorRef, _domSanitizer: DomSanitizer, _ts: TranslateService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTextComponent, "ajf-text", never, { "htmlText": "htmlText"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTextComponent>;
}

export declare class AjfTextModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfTextModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfTextModule, [typeof i1.AjfTextComponent], [typeof i2.CommonModule, typeof i3.TranslateModule], [typeof i1.AjfTextComponent]>;
}
