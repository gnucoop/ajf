export declare class AjfTextComponent {
    set htmlText(htmlText: string);
    get innerHTML(): SafeHtml;
    constructor(_cdr: ChangeDetectorRef, _domSanitizer: DomSanitizer, _ts: TranslocoService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTextComponent, "ajf-text", never, { "htmlText": "htmlText"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTextComponent, never>;
}

export declare class AjfTextModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTextModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfTextModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfTextModule, [typeof i1.AjfTextComponent], [typeof i2.CommonModule, typeof i3.AjfTranslocoModule], [typeof i1.AjfTextComponent]>;
}
