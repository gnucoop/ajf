export declare type AjfHorizontalPageSliderSlideDirection = 'left' | 'right';

export declare class AjfPageSlider implements AfterContentInit, OnDestroy {
    body: ElementRef;
    get currentPage(): number;
    set currentPage(currentPage: number);
    duration: number;
    get fixedOrientation(): boolean;
    set fixedOrientation(fixedOrientation: boolean);
    get hideNavigationButtons(): boolean;
    set hideNavigationButtons(hnb: boolean);
    get orientation(): AjfPageSliderOrientation;
    set orientation(orientation: AjfPageSliderOrientation);
    readonly orientationChange: Observable<AjfPageSliderOrientation>;
    readonly pageScrollFinish: Observable<void>;
    pages: QueryList<AjfPageSliderItem>;
    constructor(_animationBuilder: AnimationBuilder, _cdr: ChangeDetectorRef, _renderer: Renderer2);
    isCurrentPageLong(): boolean;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    onMouseWheel(event: Event): void;
    onTouchEnd(): void;
    onTouchMove(evt: TouchEvent): void;
    onTouchStart(evt: TouchEvent): void;
    slide(opts: AjfPageSliderSlideOptions): void;
    switchOrientation(): void;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfPageSlider, never, never, { "duration": "duration"; "orientation": "orientation"; "fixedOrientation": "fixedOrientation"; "currentPage": "currentPage"; "hideNavigationButtons": "hideNavigationButtons"; }, { "pageScrollFinish": "pageScrollFinish"; "orientationChange": "orientationChange"; }, ["pages"]>;
    static ɵfac: i0.ɵɵFactoryDef<AjfPageSlider, never>;
}

export declare class AjfPageSliderItem implements OnDestroy {
    content: ElementRef;
    readonly scroll: Observable<{
        x: number;
        y: number;
    }>;
    wrapper: ElementRef;
    constructor(_el: ElementRef, _renderer: Renderer2);
    ngOnDestroy(): void;
    setScroll(dir: AjfPageSliderItemScrollDirection, amount: number, _duration: number): boolean;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfPageSliderItem, "ajf-page-slider-item", never, {}, { "scroll": "scroll"; }, never, ["*"]>;
    static ɵfac: i0.ɵɵFactoryDef<AjfPageSliderItem, never>;
}

export declare type AjfPageSliderItemScrollDirection = 'x' | 'y';

export declare class AjfPageSliderModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfPageSliderModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfPageSliderModule, [typeof i1.AjfPageSliderItem], never, [typeof i1.AjfPageSliderItem]>;
}

export declare type AjfPageSliderOrientation = 'horizontal' | 'vertical';

export declare type AjfPageSliderSlideDirection = 'back' | 'forward' | AjfHorizontalPageSliderSlideDirection | AjfVerticalPageSliderSlideDirection;

export interface AjfPageSliderSlideOptions {
    dir?: AjfPageSliderSlideDirection;
    to?: number;
}

export declare type AjfVerticalPageSliderSlideDirection = 'up' | 'down';
