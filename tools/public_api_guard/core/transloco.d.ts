export declare const addLang: (lang: string, translation: Translation, prefix?: string | undefined) => void;

export declare class AjfTranslocoModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTranslocoModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfTranslocoModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfTranslocoModule, never, [typeof i1.TranslocoModule], [typeof i1.TranslocoModule]>;
}

export declare const langs: {
    [key: string]: Translation;
};

export declare class MissingHandler implements TranslocoMissingHandler {
    handle(key: string): string;
}

export declare class TranslocoHttpLoader implements TranslocoLoader {
    constructor();
    getTranslation(lang: string): Observable<Translation>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslocoHttpLoader, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TranslocoHttpLoader>;
}

export declare const updateLang: (lang: string, translation: Translation, prefix?: string | undefined) => void;
