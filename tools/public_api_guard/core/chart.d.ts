export declare class AjfChartComponent implements AfterViewInit, OnChanges {
    chartType: ExtendedChartType;
    data: ChartData;
    instance: ChartWidgetInstance;
    options: ChartOptions;
    constructor(_el: ElementRef, _renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfChartComponent, "ajf-chart", never, { "data": "data"; "options": "options"; "chartType": "chartType"; "instance": "instance"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfChartComponent, never>;
}

export declare class AjfChartModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfChartModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfChartModule, [typeof i1.AjfChartComponent], never, [typeof i1.AjfChartComponent]>;
}

export declare type ExtendedChartType = ChartType | 'horizontalBar' | 'scatter' | 'pie';

export declare function registerChartPlugins(plugins: any[]): void;
