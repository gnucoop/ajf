export declare class AjfTranslocoModule {
    constructor(ts: TranslocoService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTranslocoModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfTranslocoModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfTranslocoModule, never, [typeof i1.TranslocoModule], [typeof i1.TranslocoModule]>;
    static forRoot(): ModuleWithProviders<AjfTranslocoModule>;
}

export declare const langs: {
    [key: string]: Translation;
};

export declare class MissingHandler implements TranslocoMissingHandler {
    handle(key: string): string;
}
