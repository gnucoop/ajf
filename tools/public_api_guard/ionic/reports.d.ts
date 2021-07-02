export declare class AjfChartWidgetComponent extends AjfBaseWidgetComponent<AjfChartWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfChartWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfChartWidgetComponent, never>;
}

export declare class AjfColumnWidgetComponent extends AjfBaseWidgetComponent<AjfColumnWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfColumnWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfColumnWidgetComponent, never>;
}

export declare class AjfFormulaWidgetComponent extends AjfBaseWidgetComponent<AjfFormulaWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormulaWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormulaWidgetComponent, never>;
}

export declare class AjfImageContainerWidgetComponent extends AjfBaseWidgetComponent<AjfImageContainerWidgetInstance> {
    readonly imageTypes: typeof AjfImageType;
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfImageContainerWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfImageContainerWidgetComponent, never>;
}

export declare class AjfImageWidgetComponent extends AjfBaseWidgetComponent<AjfImageWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfImageWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfImageWidgetComponent, never>;
}

export declare class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent<AjfLayoutWidgetInstance> implements AfterContentChecked {
    readonly allcolumnsRendered$: Observable<boolean>;
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    ngAfterContentChecked(): void;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfLayoutWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfLayoutWidgetComponent, never>;
}

export declare class AjfMapWidgetComponent extends AjfBaseWidgetComponent<AjfMapWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfMapWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfMapWidgetComponent, never>;
}

export declare class AjfPageBreakWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfPageBreakWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfPageBreakWidgetComponent, never>;
}

export declare class AjfReportRenderer extends AjfCoreReportRenderer {
    constructor(cdr: ChangeDetectorRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportRenderer, "ajf-report", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportRenderer, never>;
}

export declare class AjfReportsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportsModule, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AjfReportsModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AjfReportsModule, [typeof i1.AjfChartWidgetComponent, typeof i2.AjfColumnWidgetComponent, typeof i3.AjfFormulaWidgetComponent, typeof i4.AjfImageContainerWidgetComponent, typeof i5.AjfImageWidgetComponent, typeof i2.AjfLayoutWidgetComponent, typeof i6.AjfMapWidgetComponent, typeof i7.AjfPageBreakWidgetComponent, typeof i8.AjfReportRenderer, typeof i2.AjfReportWidget, typeof i9.AjfTableWidgetComponent, typeof i10.AjfTextWidgetComponent], [typeof i11.AjfChartModule, typeof i12.AjfCommonModule, typeof i13.AjfImageModule, typeof i14.AjfMapModule, typeof i15.AjfPageBreakModule, typeof i16.AjfTableModule, typeof i17.AjfTextModule, typeof i18.CommonModule, typeof i19.AjfReportsModule, typeof i20.AjfTranslocoModule], [typeof i8.AjfReportRenderer, typeof i2.AjfReportWidget]>;
}

export declare class AjfReportWidget extends CoreComponent {
    readonly widgetsMap: AjfWidgetComponentsMap;
    constructor(cfr: ComponentFactoryResolver, renderer: Renderer2, widgetService: AjfWidgetService);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportWidget, "ajf-widget", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportWidget, never>;
}

export declare class AjfTableWidgetComponent extends AjfBaseWidgetComponent<AjfTableWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTableWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTableWidgetComponent, never>;
}

export declare class AjfTextWidgetComponent extends AjfBaseWidgetComponent<AjfTextWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTextWidgetComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTextWidgetComponent, never>;
}

export declare class AjfWidgetService extends CoreService {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfWidgetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfWidgetService>;
}
