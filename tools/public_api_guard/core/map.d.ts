export declare class AjfMapComponent implements AfterViewInit, OnDestroy {
    set attribution(attribution: string);
    set coordinate(coordinate: number[]);
    set disabled(disabled: boolean);
    get map(): Map;
    mapContainer: AjfMapContainerDirective;
    set tileLayer(tl: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    redraw(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfMapComponent, "ajf-map", never, { "coordinate": "coordinate"; "tileLayer": "tileLayer"; "attribution": "attribution"; "disabled": "disabled"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfMapComponent, never>;
}

export declare class AjfMapModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfMapModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfMapModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfMapModule, [typeof i1.AjfMapComponent, typeof i2.AjfMapContainerDirective], never, [typeof i1.AjfMapComponent]>;
}
