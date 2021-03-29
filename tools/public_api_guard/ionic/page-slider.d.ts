export declare class AjfPageSlider extends AjfCorePageSlider implements AfterContentInit, OnDestroy {
    constructor(animationBuilder: AnimationBuilder, cdr: ChangeDetectorRef, renderer: Renderer2, _el: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfPageSlider, "ajf-page-slider", never, {}, {}, never, ["*", "[ajfPageSliderBar]"]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfPageSlider, never>;
}

export declare class AjfPageSliderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfPageSliderModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfPageSliderModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfPageSliderModule, [typeof i1.AjfPageSlider], [typeof i2.AjfPageSliderModule, typeof i3.CommonModule, typeof i4.IonicModule], [typeof i2.AjfPageSliderModule, typeof i1.AjfPageSlider]>;
}
