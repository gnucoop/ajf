export declare class AjfPageSlider extends AjfCorePageSlider {
    constructor(animationBuilder: AnimationBuilder, cdr: ChangeDetectorRef, renderer: Renderer2);
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfPageSlider, "ajf-page-slider", never, {}, {}, never, ["*", "[ajfPageSliderBar]"]>;
    static ɵfac: i0.ɵɵFactoryDef<AjfPageSlider, never>;
}

export declare class AjfPageSliderModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfPageSliderModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfPageSliderModule, [typeof i1.AjfPageSlider], [typeof i2.CommonModule, typeof i3.MatButtonModule, typeof i4.MatIconModule, typeof i5.MatToolbarModule, typeof i6.AjfPageSliderModule], [typeof i6.AjfPageSliderModule, typeof i1.AjfPageSlider]>;
}
