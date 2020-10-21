export declare const AJF_REPORTS_CONFIG: InjectionToken<AjfReportsConfig>;

export declare class AjfReportBuilder implements AfterContentInit {
    get report(): AjfReport;
    set report(report: AjfReport);
    startSidenav: MatSidenav;
    constructor(_service: AjfReportBuilderService);
    ngAfterContentInit(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfReportBuilder, "ajf-report-builder", never, { "report": "report"; }, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportBuilder, never>;
}

export declare class AjfReportBuilderModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfReportBuilderModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfReportBuilderModule, [typeof i1.AjfImageFilterPipe, typeof i2.AjfQuillEditor, typeof i3.AjfReportBuilderColumn, typeof i4.AjfReportBuilderConditionEditor, typeof i5.AjfReportBuilderContent, typeof i6.AjfReportBuilderCustomWidgetDialog, typeof i7.AjfReportBuilderCustomWidgetsToolbar, typeof i8.AjfReportBuilderCustomWidgetToolbarButton, typeof i9.AjfReportBuilderFormsAnalyzer, typeof i10.AjfReportBuilderFormsAnalyzerDialog, typeof i11.AjfReportBuilderImageGroup, typeof i12.AjfReportBuilderProperties, typeof i13.AjfReportBuilderRendererWidget, typeof i14.AjfReportBuilderThemeColor, typeof i15.AjfReportBuilderThemeColorDialog, typeof i16.AjfReportBuilderToolbar, typeof i17.AjfReportBuilderToolbarDialog, typeof i18.AjfReportBuilderWidgetsRowButtons, typeof i19.AjfReportBuilderWidgetsToolbar, typeof i20.AjfReportBuilderWidgetToolbarButton, typeof i21.AjfReportBuilder], [typeof i22.AjfCommonModule, typeof i23.AjfImageModule, typeof i24.AjfMapModule, typeof i25.AjfMonacoEditorModule, typeof i26.AjfTableModule, typeof i27.AjfTextModule, typeof i28.ColorPickerModule, typeof i29.CommonModule, typeof i30.DragDropModule, typeof i31.FormsModule, typeof i32.MatButtonModule, typeof i33.MatButtonToggleModule, typeof i34.MatCardModule, typeof i35.MatDialogModule, typeof i36.MatGridListModule, typeof i37.MatIconModule, typeof i38.MatListModule, typeof i39.MatSelectModule, typeof i40.MatSidenavModule, typeof i41.MatSlideToggleModule, typeof i42.MatSliderModule, typeof i43.MatTabsModule, typeof i44.MatToolbarModule, typeof i45.MatTooltipModule, typeof i46.TranslateModule], [typeof i21.AjfReportBuilder]>;
}

export declare class AjfReportBuilderService {
    get colors(): Observable<string[]>;
    get columnWidthChanged(): EventEmitter<void>;
    columnWidthChangedEmitter: EventEmitter<void>;
    get conditionNames(): Observable<AjfFormVariables[]>;
    get contentStyles(): Observable<AjfStyles>;
    get contentWidgets(): Observable<AjfWidgetsContainer>;
    get currentWidget(): Observable<AjfWidget | null>;
    get customWidgets(): Observable<AjfCustomWidget[]>;
    get emptyContent(): Observable<boolean>;
    get fixedZoom(): Observable<boolean>;
    get footerStyles(): Observable<AjfStyles>;
    get footerWidgets(): Observable<AjfWidgetsContainer>;
    get formsVariables(): Observable<AjfFormVariables[]>;
    get getSaveReport(): Observable<any>;
    get headerStyles(): Observable<AjfStyles>;
    get headerWidgets(): Observable<AjfWidgetsContainer>;
    get iconSets(): AjfReportIcons;
    get onDragEnter(): Observable<any>;
    get onDragged(): Observable<any>;
    get onOver(): Observable<any>;
    get origin(): Observable<string>;
    get report(): Observable<AjfReport | null>;
    get reportForms(): Observable<AjfForm[]>;
    get reportSaved(): Observable<AjfReport>;
    get reportStyles(): Observable<AjfStyles>;
    constructor(reportsConfig: AjfReportsConfig);
    addChartBackgroundColor(color: string): void;
    addChartBorderColor(color: string): void;
    addColumn(): void;
    addContentWidget(widget: AjfWidget, position?: number): void;
    addCustomColor(color: string): void;
    addCustomWidgets(widget: AjfCustomWidget, position?: number): void;
    addHeaderWidget(widget: AjfWidget, position?: number): void;
    addToColumn(event: any, toColumn: AjfColumnWidget, position?: number): void;
    addToContent(newWidget: AjfWidget, idx: number): void;
    addfooterWidget(widget: AjfWidget, position?: number): void;
    changeColumn(from: number, to: number, layoutWidget: AjfLayoutWidget): void;
    changeLabelCustomWidget(label: string, position: number): void;
    changePositionOnColumn(event: any, toColumn: AjfColumnWidget, toIndex: number): void;
    dragEnded(): void;
    dragEnter(array: string, index: number): void;
    dragLeave(): void;
    dragStarted(): void;
    extractLabelsNodes(nodes: AjfNode[]): any;
    extractNamesNodes(nodes: AjfNode[]): any;
    extractTypesNodes(nodes: AjfNode[]): any;
    fillFormsVariables(forms: AjfForm[]): AjfFormVariables[];
    filterNodes(nodes: AjfNode[]): AjfNode[];
    fixedColumn(idx: number): void;
    fixedZoomIn(): void;
    fixedZoomOut(): void;
    getFormulaToHtmlEvent(): Observable<string>;
    instantColumnValue(newValue: number, idx: number): void;
    isNumber(value: any): boolean;
    isNumberArray(value: any[]): boolean;
    overEnded(): void;
    overStarted(): void;
    parseColor(cssStyles: any, colors: string[]): void;
    popJsonStack(): string | undefined;
    pushJsonStack(json: string): void;
    remove(node: string, idx: number): void;
    removeChartBackgroundColor(idx: number): void;
    removeChartBorderColor(idx: number): void;
    removeData(_mainIndex: number, _index: number): void;
    removeMainData(_idx: number): void;
    removeRelatedData(_mainIdx: number, _idx: number): void;
    removeTableMainData(index: number): void;
    removeWidgetToColumn(column: AjfColumnWidget, index: number): void;
    resetCustomWidgets(): void;
    roundTo(value: number, decimalPositions: number): number;
    saveChartFormula(_label: string, _level: number, _mainIndex: number, _index: number, formulaText: string, aggregationType: number): void;
    saveCondition(conditionText: string): void;
    saveFormulaToHtml(htmlFormula: string, reference: any): void;
    saveImageFormula(formula: AjfFormula): void;
    saveReport(): void;
    saveTableFormula(_label: string, aggregationType: number, formulaText: string, _mainIndex: number, _index: number): void;
    setChartBackgroundColor(colors: string[]): void;
    setChartBorderColor(colors: string[]): void;
    setChartBorderWidth(value: number): void;
    setChartType(type: number): void;
    setEmptyContent(val: boolean): void;
    setFlag(value: string): void;
    setIcon(icon: {
        fontSet: string;
        fontIcon: string;
    }): void;
    setImageUrl(imageUrl: string): void;
    setOrigin(origin: string): void;
    setReport(report: AjfReport): void;
    setReportForms(forms: AjfForm[]): void;
    setReportStyles(label: string, value: string): void;
    setSaveReport(json: any): void;
    setSectionStyles(origin: string, label: string, value: string): void;
    setWidgetStyles(label: string, value: string | string[]): void;
    unfixedColumn(idx: number): void;
    updateArrayWidgets(type: string, newWidget: AjfWidgetsContainer): void;
    updateCurrentWidget(newWidget: AjfWidget | null): void;
    static ɵfac: i0.ɵɵFactoryDef<AjfReportBuilderService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<AjfReportBuilderService>;
}

export interface AjfReportsConfig {
    icons?: AjfReportIcons;
}
