export declare abstract class AjfImage implements OnDestroy, OnInit {
    set flag(flag: string | null);
    readonly flagName: Observable<string | null>;
    set icon(icon: AjfImageIcon | null);
    iconComponent: ElementRef;
    readonly iconObj: Observable<AjfImageIcon | null>;
    readonly imageType: Observable<AjfImageType | null>;
    readonly imageTypes: typeof AjfImageType;
    set imageUrl(imageUrl: string | null);
    set type(type: AjfImageType | null);
    readonly url: Observable<string | SafeResourceUrl | null>;
    constructor(_el: ElementRef, _renderer: Renderer2, _domSanitizer: DomSanitizer);
    ngOnDestroy(): void;
    ngOnInit(): void;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfImage, never, never, { "type": "type"; "imageUrl": "imageUrl"; "icon": "icon"; "flag": "flag"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfImage, never>;
}

export interface AjfImageIcon {
    fontIcon: string;
    fontSet: string;
}

export declare enum AjfImageType {
    Image = 0,
    Flag = 1,
    Icon = 2,
    LENGTH = 3
}
