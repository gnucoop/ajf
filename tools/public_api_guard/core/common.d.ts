export declare class AjfCommonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfCommonModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfCommonModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfCommonModule, [typeof i1.AjfDndDirective, typeof i2.AjfVideoDirective, typeof i3.ApplyStylesDirective, typeof i4.AutofocusDirective, typeof i5.FormatIfNumber, typeof i6.TranslateIfString], never, [typeof i1.AjfDndDirective, typeof i2.AjfVideoDirective, typeof i3.ApplyStylesDirective, typeof i4.AutofocusDirective, typeof i5.FormatIfNumber, typeof i6.TranslateIfString]>;
}

export declare type AjfContext = {
    [key: string]: any;
};

export declare class AjfDndDirective {
    file: Observable<FileList>;
    get over(): boolean;
    onDragLeave(evt: DragEvent): void;
    onDragOver(evt: DragEvent): void;
    onDrop(evt: DragEvent): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfDndDirective, "[ajfDnd]", never, {}, { "file": "file"; }, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDndDirective, never>;
}

export interface AjfStringIdentifier {
    label: string;
    show?: 'all' | 'first' | 'last';
    value: string[];
}

export declare class AjfVideoDirective implements AfterViewInit {
    isInit: EventEmitter<any>;
    get source(): HTMLVideoElement;
    set source(source: HTMLVideoElement);
    constructor(_el: ElementRef, _renderer: Renderer2);
    ngAfterViewInit(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfVideoDirective, "[ajfVideoDirective]", never, { "source": "source"; }, { "isInit": "isInit"; }, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfVideoDirective, never>;
}

export declare class ApplyStylesDirective {
    set applyStyles(cssStyles: {
        [style: string]: any;
    } | null);
    constructor(_el: ElementRef, _renderer: Renderer2);
    static ɵdir: i0.ɵɵDirectiveDeclaration<ApplyStylesDirective, "[applyStyles]", never, { "applyStyles": "applyStyles"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplyStylesDirective, never>;
}

export declare class AutofocusDirective implements AfterContentInit {
    appAutoFocus: boolean;
    constructor(_el: ElementRef);
    ngAfterContentInit(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AutofocusDirective, "[autoFocus]", never, { "appAutoFocus": "appAutoFocus"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutofocusDirective, never>;
}

export declare const buildStringIdentifier: (stringIdentifier: AjfStringIdentifier[] | undefined, context: AjfContext, opts?: BuildStringIdentifierOpts | undefined) => string;

export declare const buildStringIdentifierOpts: (opts?: BuildStringIdentifierOpts | undefined) => Required<BuildStringIdentifierOpts>;

export interface BuildStringIdentifierOpts {
    emptyString?: string;
    entriesDivider?: string;
    labelSuffix?: string;
    valuesDivider?: string;
}

export declare class FormatIfNumber extends DecimalPipe {
    transform(value: any, digitsInfo?: string, locale?: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormatIfNumber, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FormatIfNumber, "ajfFormatIfNumber">;
}

export declare class TranslateIfString extends TranslatePipe {
    transform(query: any, ...args: any[]): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslateIfString, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TranslateIfString, "ajfTranslateIfString">;
}
