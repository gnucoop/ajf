export declare class AjfChartWidgetComponent extends AjfBaseWidgetComponent<AjfChartWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfChartWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfChartWidgetComponent, never>;
}

export declare class AjfColumnWidgetComponent extends AjfBaseWidgetComponent<AjfColumnWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfColumnWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfColumnWidgetComponent, never>;
}

export declare class AjfFormulaWidgetComponent extends AjfBaseWidgetComponent<AjfFormulaWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFormulaWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormulaWidgetComponent, never>;
}

export declare class AjfImageContainerWidgetComponent extends AjfBaseWidgetComponent<AjfImageContainerWidgetInstance> {
    readonly imageTypes: typeof AjfImageType;
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfImageContainerWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfImageContainerWidgetComponent, never>;
}

export declare class AjfImageWidgetComponent extends AjfBaseWidgetComponent<AjfImageWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfImageWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfImageWidgetComponent, never>;
}

export declare class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent<AjfLayoutWidgetInstance> implements AfterContentChecked {
    readonly allcolumnsRendered$: Observable<boolean>;
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    ngAfterContentChecked(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfLayoutWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfLayoutWidgetComponent, never>;
}

export declare class AjfMapWidgetComponent extends AjfBaseWidgetComponent<AjfMapWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfMapWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfMapWidgetComponent, never>;
}

export declare class AjfPageBreakWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfPageBreakWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfPageBreakWidgetComponent, never>;
}

export declare class AjfReportRenderer extends AjfCoreReportRenderer {
    constructor(cdr: ChangeDetectorRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReportRenderer, "ajf-report", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportRenderer, never>;
}

export declare class AjfReportsModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfReportsModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfReportsModule, [typeof i1.AjfChartWidgetComponent, typeof i2.AjfColumnWidgetComponent, typeof i3.AjfFormulaWidgetComponent, typeof i4.AjfImageContainerWidgetComponent, typeof i5.AjfImageWidgetComponent, typeof i6.AjfLayoutWidgetComponent, typeof i7.AjfMapWidgetComponent, typeof i8.AjfPageBreakWidgetComponent, typeof i9.AjfReportRenderer, typeof i10.AjfReportWidget, typeof i11.AjfTableWidgetComponent, typeof i12.AjfTextWidgetComponent], [typeof i13.AjfChartModule, typeof i14.AjfCommonModule, typeof i15.AjfImageModule, typeof i16.AjfMapModule, typeof i17.AjfPageBreakModule, typeof i18.AjfTableModule, typeof i19.AjfTextModule, typeof i20.CommonModule, typeof i21.AjfReportsModule, typeof i22.TranslateModule], [typeof i9.AjfReportRenderer, typeof i10.AjfReportWidget]>;
}

export declare class AjfReportWidget extends CoreComponent {
    readonly widgetsMap: AjfWidgetComponentsMap;
    constructor(cfr: ComponentFactoryResolver, renderer: Renderer2, widgetService: AjfWidgetService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReportWidget, "ajf-widget", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportWidget, never>;
}

export declare class AjfTableWidgetComponent extends AjfBaseWidgetComponent<AjfTableWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTableWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTableWidgetComponent, never>;
}

export declare class AjfTextWidgetComponent extends AjfBaseWidgetComponent<AjfTextWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTextWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTextWidgetComponent, never>;
}

export declare class AjfWidgetService extends CoreService {
    constructor();
    static ɵfac: i0.ɵɵFactoryDef<AjfWidgetService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AjfWidgetService>;
}
