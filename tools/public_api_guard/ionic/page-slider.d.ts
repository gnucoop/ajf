export declare class AjfPageSlider extends AjfCorePageSlider implements AfterContentInit, OnDestroy {
    constructor(animationBuilder: AnimationBuilder, cdr: ChangeDetectorRef, renderer: Renderer2, _el: ElementRef);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfPageSlider, "ajf-page-slider", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfPageSlider>;
}

export declare class AjfPageSliderModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfPageSliderModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfPageSliderModule, [typeof i1.AjfPageSlider], [typeof i2.CommonModule, typeof i3.IonicModule, typeof i4.AjfPageSliderModule], [typeof i4.AjfPageSliderModule, typeof i1.AjfPageSlider]>;
}
