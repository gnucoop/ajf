export declare class AjfDropMessage {
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfDropMessage, "[ajfDropMessage]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDropMessage, never>;
}

export interface AjfFile {
    content: string;
    name: string;
    size: number;
    type: string;
}

export declare class AjfFileInput implements ControlValueAccessor {
    _controlValueAccessorChangeFn: (value: any) => void;
    _dropMessageChildren: QueryList<AjfDropMessage>;
    _filePreviewChildren: QueryList<AjfFilePreview>;
    _nativeInput: ElementRef<HTMLInputElement>;
    _onTouched: () => any;
    accept: string;
    readonly fileIcon: SafeResourceUrl;
    readonly removeIcon: SafeResourceUrl;
    get value(): any;
    set value(value: any);
    readonly valueChange: Observable<AjfFile | undefined>;
    constructor(domSanitizer: DomSanitizer, _cdr: ChangeDetectorRef);
    onFileDrop(files: FileList): void;
    onSelectFile(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    resetValue(): void;
    triggerNativeInput(): void;
    writeValue(value: any): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFileInput, "ajf-file-input", never, { "accept": "accept"; "value": "value"; }, { "valueChange": "valueChange"; }, ["_dropMessageChildren", "_filePreviewChildren"], ["[ajfDropMessage]", "[ajfFilePreview]"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFileInput, never>;
}

export declare class AjfFileInputModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFileInputModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfFileInputModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfFileInputModule, [typeof i1.AjfDropMessage, typeof i1.AjfFileInput, typeof i1.AjfFilePreview], [typeof i2.AjfCommonModule, typeof i3.CommonModule, typeof i4.AjfTranslocoModule], [typeof i1.AjfDropMessage, typeof i1.AjfFileInput, typeof i1.AjfFilePreview]>;
}

export declare class AjfFilePreview implements OnDestroy {
    get value(): AjfFile;
    constructor(vcr: ViewContainerRef);
    ngOnDestroy(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfFilePreview, "[ajfFilePreview]", ["ajfFilePreview"], {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFilePreview, never>;
}

export declare const fileIcon: string;
