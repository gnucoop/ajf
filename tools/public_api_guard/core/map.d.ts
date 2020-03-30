export declare class AjfMapComponent implements AfterViewInit, OnDestroy {
    set attribution(attribution: string);
    set coordinate(coordinate: number[]);
    set disabled(disabled: boolean);
    get map(): L.Map;
    mapContainer: AjfMapContainerDirective;
    set tileLayer(tileLayer: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    redraw(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfMapComponent, "ajf-map", never, { "coordinate": "coordinate"; "tileLayer": "tileLayer"; "attribution": "attribution"; "disabled": "disabled"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfMapComponent, never>;
}

export declare class AjfMapModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfMapModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfMapModule, [typeof i1.AjfMapComponent, typeof i2.AjfMapContainerDirective], never, [typeof i1.AjfMapComponent]>;
}
