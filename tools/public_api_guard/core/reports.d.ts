export interface AjfAggregation {
    aggregation: AjfAggregationType;
}

export declare type AjfAggregationCreate = Partial<AjfAggregation>;

export declare class AjfAggregationSerializer {
    static fromJson(json: Partial<AjfAggregation>): AjfAggregation;
}

export declare enum AjfAggregationType {
    None = 0,
    Sum = 1,
    Average = 2,
    WeightedAverage = 3,
    LENGTH = 4
}

export declare abstract class AjfBaseWidgetComponent<T extends AjfWidgetInstance = AjfWidgetInstance> {
    readonly el: ElementRef;
    get instance(): T;
    set instance(instance: T);
    constructor(_cdr: ChangeDetectorRef, el: ElementRef);
}

export interface AjfChartDataset extends AjfDataset {
    chartType?: AjfChartType;
    datalabels?: any;
    formula: AjfFormula[];
    options?: AjfChartDatasetOptions;
}

export interface AjfChartDatasetOptions {
    backgroundColor?: ChartColor | ChartColor[];
    borderCapStyle?: string;
    borderColor?: ChartColor;
    borderDash?: number[];
    borderDashOffset?: number;
    borderJoinStyle?: string;
    borderWidth?: number;
    datalabels?: any;
    fill?: boolean;
    hidden?: boolean;
    hideInLegendAndTooltip?: boolean;
    label?: string;
    lineTension?: number;
    pointBackgroundColor?: ChartColor | ChartColor[];
    pointBorderColor?: ChartColor | ChartColor[];
    pointBorderWidth?: number | number[];
    pointHitRadius?: number | number[];
    pointHoverBackgroundColor?: ChartColor | ChartColor[];
    pointHoverBorderColor?: ChartColor | ChartColor[];
    pointHoverBorderWidth?: number | number[];
    pointHoverRadius?: number | number[];
    pointRadius?: number | number[];
    pointStyle?: string | string[] | HTMLImageElement | HTMLImageElement[];
    stack?: string;
    type?: string;
    xAxisID?: string;
    yAxisID?: string;
}

export declare enum AjfChartType {
    Line = 0,
    Bar = 1,
    HorizontalBar = 2,
    Radar = 3,
    Scatter = 4,
    Doughnut = 5,
    Pie = 6,
    PolarArea = 7,
    Bubble = 8,
    LENGTH = 9
}

export interface AjfChartWidget extends AjfDataWidget {
    chartType: AjfChartType;
    dataset: AjfChartDataset[];
    exportable?: boolean;
    labels: AjfFormula | AjfFormula[];
    options: ChartOptions;
    type?: AjfChartType;
}

export interface AjfChartWidgetInstance extends AjfDataWidgetInstance {
    chartType: ExtendedChartType;
    data: ChartData;
    datasets: ChartDataSets[];
    exportable: boolean;
    labels: string[];
    widget: AjfChartWidget;
    canvasDataUrl?(): string;
}

export declare type AjfColumnWidget = AjfWidgetWithContent;

export interface AjfColumnWidgetInstance extends AjfWidgetWithContentInstance {
    widget: AjfColumnWidget;
}

export interface AjfCustomWidget {
    json: string;
    type: string;
}

export interface AjfDataset {
    aggregation: AjfAggregation;
    formula?: AjfFormula | AjfFormula[];
    label?: string;
}

export declare class AjfDatasetSerializer {
    static fromJson(json: Partial<AjfDataset>): AjfDataset;
}

export interface AjfDataWidget extends AjfWidget {
    dataset: AjfDataset[] | AjfDataset[][];
}

export interface AjfDataWidgetInstance extends AjfWidgetInstance {
    dataset: any;
    widget: AjfDataWidget;
}

export interface AjfFormulaWidget extends AjfWidget {
    formula: AjfFormula;
}

export interface AjfFormulaWidgetInstance extends AjfWidgetInstance {
    formula: string;
    widget: AjfFormulaWidget;
}

export declare class AjfGetColumnContentPipe {
    transform(instance: AjfLayoutWidgetInstance, column: number): AjfWidgetInstance | null;
    static ɵfac: i0.ɵɵFactoryDef<AjfGetColumnContentPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfGetColumnContentPipe, "ajfGetColumnContent">;
}

export interface AjfImageContainerWidget extends AjfWidget {
    flags?: AjfFormula | AjfFormula[];
    icons?: AjfFormula | AjfFormula[];
    imageType: AjfImageType;
    urls?: AjfFormula | AjfFormula[];
}

export interface AjfImageContainerWidgetInstance extends AjfWidgetInstance {
    flags: string[];
    icons: AjfImageIcon[];
    urls: string[];
    widget: AjfImageContainerWidget;
}

export interface AjfImageWidget extends AjfWidget {
    flag?: AjfFormula;
    icon?: AjfFormula;
    imageType: AjfImageType;
    url?: AjfFormula;
}

export interface AjfImageWidgetInstance extends AjfWidgetInstance {
    flag: string;
    icon: AjfImageIcon;
    url: string;
    widget: AjfImageWidget;
}

export interface AjfLayoutWidget extends AjfWidgetWithContent {
    columns: number[];
}

export interface AjfLayoutWidgetInstance extends AjfWidgetWithContentInstance {
    widget: AjfLayoutWidget;
}

export interface AjfMapWidget extends AjfDataWidget {
    attribution: string;
    coordinate: AjfFormula;
    disabled: boolean;
    tileLayer: string;
}

export interface AjfMapWidgetInstance extends AjfWidgetInstance {
    coordinate: number[];
    widget: AjfMapWidget;
}

export declare type AjfPageBreakWidget = AjfWidget;

export interface AjfPageBreakWidgetInstance extends AjfWidgetInstance {
    widget: AjfPageBreakWidget;
}

export interface AjfReport {
    content?: AjfReportContainer;
    footer?: AjfReportContainer;
    forms?: AjfForm[];
    header?: AjfReportContainer;
    stringIdentifier?: AjfReportStringIdentifier[];
    styles?: AjfStyles;
    variables?: AjfReportVariable[];
}

export interface AjfReportContainer {
    content: AjfWidget[];
    styles: AjfStyles;
}

export interface AjfReportContainerInstance {
    container: AjfReportContainer;
    content: AjfWidgetInstance[];
    styles: AjfStyles;
}

export declare class AjfReportContainerSerializer {
    static fromJson(json: Partial<AjfReportContainer>): AjfReportContainer;
}

export interface AjfReportInstance {
    content?: AjfReportContainerInstance;
    footer?: AjfReportContainerInstance;
    header?: AjfReportContainerInstance;
    report: AjfReport;
    styles: AjfStyles;
}

export declare abstract class AjfReportRenderer {
    get instance(): AjfReportInstance;
    set instance(instance: AjfReportInstance);
    get report(): AjfReport | null;
    constructor(_cdr: ChangeDetectorRef);
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfReportRenderer, never, never, { "instance": "instance"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportRenderer, never>;
}

export declare class AjfReportSerializer {
    static fromJson(json: Partial<AjfReport>): AjfReport;
}

export declare class AjfReportsModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfReportsModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfReportsModule, [typeof i1.AjfGetColumnContentPipe, typeof i2.AjfReportStringIdentifierPipe, typeof i3.AjfWidgetHost, typeof i4.AjfWidgetExport], [typeof i5.CommonModule], [typeof i1.AjfGetColumnContentPipe, typeof i2.AjfReportStringIdentifierPipe, typeof i3.AjfWidgetHost, typeof i4.AjfWidgetExport]>;
}

export declare type AjfReportStringIdentifier = AjfStringIdentifier;

export declare class AjfReportStringIdentifierPipe implements PipeTransform {
    transform(report: AjfReport, context: AjfContext, opts?: BuildStringIdentifierOpts): string;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportStringIdentifierPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AjfReportStringIdentifierPipe, "ajfReportStringIdentifier">;
}

export interface AjfReportVariable {
    formula: AjfFormula;
    name: string;
}

export declare abstract class AjfReportWidget implements OnInit {
    get instance(): AjfWidgetInstance;
    set instance(instance: AjfWidgetInstance);
    widgetHost: AjfWidgetHost;
    protected abstract widgetsMap: AjfWidgetComponentsMap;
    constructor(_cfr: ComponentFactoryResolver, _renderer: Renderer2);
    ngOnInit(): void;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfReportWidget, never, never, { "instance": "instance"; }, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportWidget, never>;
}

export interface AjfStyles {
    [style: string]: any;
}

export interface AjfTableDataset extends AjfDataset {
    colspan: number;
    formula: AjfFormula;
    rowspan: number;
    style: any;
}

export interface AjfTableWidget extends AjfDataWidget {
    cellStyles: any;
    dataset: AjfTableDataset[][];
    exportable?: boolean;
}

export interface AjfTableWidgetInstance extends AjfDataWidgetInstance {
    data: AjfTableCell[][];
    exportable: boolean;
    recalcEvt: Subject<boolean>;
    widget: AjfTableWidget;
}

export interface AjfTextWidget extends AjfWidget {
    htmlText: string;
}

export interface AjfTextWidgetInstance extends AjfWidgetInstance {
    htmlText: string;
    widget: AjfTextWidget;
}

export interface AjfWidget {
    repetitions?: AjfFormula;
    styles: AjfStyles;
    visibility: AjfCondition;
    widgetType: AjfWidgetType;
}

export interface AjfWidgetComponentsMap {
    [key: number]: {
        component: Type<AjfBaseWidgetComponent>;
        inputs?: {
            [key: string]: any;
        };
        initInstance?: (widgetInstance: AjfWidgetInstance, context: AjfContext, translateService: TranslateService) => AjfWidgetInstance;
    };
}

export declare type AjfWidgetCreate = Pick<AjfWidget, 'widgetType'> & Partial<AjfWidget>;

export declare class AjfWidgetExport {
    data: ChartData | AjfTableCell[][];
    enable: boolean;
    overlay: boolean;
    widgetType: AjfWidgetType;
    constructor();
    buildCsv(): string;
    buildXlsx(): {
        [key: string]: string | number;
    }[];
    exportCsv(): void;
    exportXlsx(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfWidgetExport, "ajf-widget-export", never, { "widgetType": "widgetType"; "data": "data"; "overlay": "overlay"; "enable": "enable"; }, {}, never, ["*"]>;
    static ɵfac: i0.ɵɵFactoryDef<AjfWidgetExport, never>;
}

export declare class AjfWidgetHost {
    readonly viewContainerRef: ViewContainerRef;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AjfWidgetHost, "[ajf-widget-host]", never, {}, {}, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfWidgetHost, never>;
}

export interface AjfWidgetInstance {
    repetitions?: number;
    styles: AjfStyles;
    visible: boolean;
    widget: AjfWidget;
    widgetType: AjfWidgetType;
}

export declare class AjfWidgetSerializer {
    static fromJson(json: Partial<AjfWidget>): AjfWidget;
}

export declare abstract class AjfWidgetService {
    readonly componentsMap: AjfWidgetComponentsMap;
    registerCustomWidget(widget: {
        widgetType: number;
        component: Type<AjfBaseWidgetComponent>;
        inputs?: {
            [key: string]: any;
        };
    }): void;
}

export declare enum AjfWidgetType {
    Layout = 0,
    PageBreak = 1,
    Image = 2,
    Text = 3,
    Chart = 4,
    Table = 5,
    Map = 6,
    Column = 7,
    Formula = 8,
    ImageContainer = 9,
    DynamicTable = 10,
    LENGTH = 11
}

export interface AjfWidgetWithContent extends AjfWidget {
    content: AjfWidget[];
}

export interface AjfWidgetWithContentInstance extends AjfWidgetInstance {
    content: AjfWidgetInstance[];
}

export declare function chartToChartJsType(chartType?: AjfChartType): ExtendedChartType;

export declare function createAggregation(aggregation: AjfAggregationCreate): AjfAggregation;

export declare function createReportInstance(report: AjfReport, context: AjfContext, ts: TranslateService): AjfReportInstance;

export declare function createReportPdf(report: AjfReportInstance, orientation?: PageOrientation): Promise<TCreatedPdf>;

export declare function createWidget(widget: AjfWidgetCreate): AjfWidget;

export declare function createWidgetInstance(widget: AjfWidget, context: AjfContext, _ts: TranslateService): AjfWidgetInstance;

export declare function openReportPdf(report: AjfReportInstance, orientation?: PageOrientation): void;

export declare function widgetToWidgetInstance(widget: AjfWidget, context: AjfContext, ts: TranslateService): AjfWidgetInstance;
